/**
 * @typedef {import('../../typedefs').ActionLog} ActionLog
 */

import {getPomodorosFromActions} from "../../services/actions";

/**
 *
 * @param {string} state
 * @returns {string}
 */
const getContentFromPomodoroState = (state) => {
    if (state === 'completed') {
        return '(P)';
    }
    return '(...P...)';
}

/**
 *
 * @param {ActionLog[]} actions
 * @returns {JSX.Element}
 * @constructor
 */
const StageStatistics = ({actions}) => {
    const pomodoros = getPomodorosFromActions(actions);
    let i = 0;
    return (<p data-testid="pomodoro-statistics-box">
        {pomodoros.filter((p) => p.stage === 'work').map((p) => {
            return (<span key={i += 1}>{getContentFromPomodoroState(p.state)}</span>);
        })}
    </p>);
}

export default StageStatistics