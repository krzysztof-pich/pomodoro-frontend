/**
 * @typedef {import('../../typedefs').ActionLog} ActionLog
 */

import {useEffect, useState} from "react";
import {
    getWorkTimeInMinutes,
    getShortBreakTimeInMinutes,
    getLongBreakTimeInMinutes,
    getStageName
} from "../../services/configuration";
import {getActivePomodoro} from "../../services/actions";
import {requestPermissions} from "../../services/notifications";


function showNotification(title, options) {
    requestPermissions();
}

/**
 *
 * @param {string} stage
 * @param {ActionLog[]} actions
 * @returns {JSX.Element}
 * @constructor
 */
const Timer = ({stage, actions}) => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const getTimeLeft = () => {
        let pomodoroTimeSeconds = 0;
        switch (stage) {
            case 'work':
                pomodoroTimeSeconds =  getWorkTimeInMinutes() * 60;
                break;
            case 'long_break':
                pomodoroTimeSeconds = getLongBreakTimeInMinutes() * 60;
                break;
            case 'short_break':
                pomodoroTimeSeconds = getShortBreakTimeInMinutes() * 60;
                break;
            default:
                throw new Error('Stage is not know');
        }

        const activePomodoro = getActivePomodoro(actions);
        if (activePomodoro) {
            pomodoroTimeSeconds -= activePomodoro.duration;
            pomodoroTimeSeconds = Math.round(pomodoroTimeSeconds);
        }

        let sign = '';
        if (pomodoroTimeSeconds < 0) {
            sign = '-';
            pomodoroTimeSeconds = Math.abs(pomodoroTimeSeconds);
        }

        if (Math.floor(pomodoroTimeSeconds) === 0) {
            showNotification(getStageName(stage), 'Session finished');
        }

        const minutesLeft = Math.floor(pomodoroTimeSeconds / 60).toString();
        const secondsLeft = pomodoroTimeSeconds % 60 < 10 ? '0' + pomodoroTimeSeconds % 60 : pomodoroTimeSeconds % 60;
        return sign + minutesLeft + ':' + secondsLeft;

    };

    return <p style={{fontSize: "45px"}}>{getTimeLeft()}</p>
}

export default Timer