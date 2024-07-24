import {getWorkTimeInMinutes, getShortBreakTimeInMinutes, getLongBreakTimeInMinutes} from "../../services/configuration";

/**
 *
 * @param {string} stage
 * @param {actions: {action: string, time: string}} actions
 * @returns {JSX.Element}
 * @constructor
 */
const Timer = ({stage, actions}) => {
    const getTimeLeft = () => {
        switch (stage) {
            case 'work':
                return getWorkTimeInMinutes() + ':00';
            case 'long_break':
                return getLongBreakTimeInMinutes() + ':00';
            case 'short_break':
                return getShortBreakTimeInMinutes() + ':00';
            default:
                throw new Error('Stage is not know');
        }
    };

    return <p style={{fontSize: "45px"}}>{getTimeLeft()}</p>
}

export default Timer