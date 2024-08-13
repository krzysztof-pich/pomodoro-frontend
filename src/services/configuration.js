const actions = [
    { name: 'start', label: 'Start', visibility: ['stop', 'pause'] },
    { name: 'pause', label: 'Pause', visibility: ['start'] },
    { name: 'stop', label: 'Stop', visibility: ['start', 'pause'] },
]

const stages = [
    { name: 'work', label: 'Work'},
    { name: 'short_break', label: 'Short break' },
    { name: 'long_break', label: 'Long break' },
]

export function getWorkTimeInMinutes() { return 25; }
export function getLongBreakTimeInMinutes() { return 15; }
export function getShortBreakTimeInMinutes() { return 5; }
export function getActions() { return actions; }

/**
 *
 * @returns {string[]}
 */
export function getActionsKeys() {
    return getActions().map(item => item.name);
}
export function getStages() { return stages; }

/**
 * @returns {string[]}
 */
export function getStagesKeys() {
    return getStages().map(item => item.name);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export function getStageName(key) {

    const stageObject = getStages().find((element) => element.name === key);
    if (!stageObject) {
        throw Error('Invalid argument');
    }
    return stageObject.label;
}