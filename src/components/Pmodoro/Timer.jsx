/**
 * @typedef {import('../../typedefs').ActionLog} ActionLog
 */

import {useEffect, useState} from "react";
import {getTimeLeft} from "../../services/progress";
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

    return <p style={{fontSize: "45px"}}>{getTimeLeft(stage, actions)}</p>
}

export default Timer