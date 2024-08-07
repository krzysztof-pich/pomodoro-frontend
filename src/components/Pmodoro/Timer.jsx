/**
 * @typedef {import('../../typedefs').ActionLog} ActionLog
 */

import {getWorkTimeInMinutes, getShortBreakTimeInMinutes, getLongBreakTimeInMinutes} from "../../services/configuration";
import {getActivePomodoro} from "../../services/actions";


/**
 *
 * @param {string} stage
 * @param {ActionLog[]} actions
 * @returns {JSX.Element}
 * @constructor
 */
const Timer = ({stage, actions}) => {
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
        }

        const minutesLeft = Math.floor(pomodoroTimeSeconds / 60).toString();
        const secondsLeft = pomodoroTimeSeconds % 60 < 10 ? '0' + pomodoroTimeSeconds % 60 : pomodoroTimeSeconds % 60;
        return minutesLeft + ':' + secondsLeft;

    };

    return <p style={{fontSize: "45px"}}>{getTimeLeft()}</p>
}

export default Timer