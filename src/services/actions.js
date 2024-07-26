/**
 * @typedef {Object} ActionLog
 * @property {string} action - The action taken (e.g., 'start', 'pause').
 * @property {string} time - The time when the action was taken in ISO 8601 format.
 * @property {string} stage - stage of pomodoro (work, short_break or long break)
 */
/**
 * @typedef {Object} Pomodoro
 * @property {string} stage - work, short_break or long_break
 * @property {string} state - state of pomodoro (completed, abandoned, paused, active)
 * @property {number} duration - time spent on pomodoro in seconds
 */
import {getActionsKeys, getStagesKeys} from "./configuration";

/**
 * @param {ActionLog[]} actions
 * @param {string} newAction
 * @param {string} stage
 */
export function updateActionsArray(actions, newAction, stage) {
    if (
        !newAction
        || !getActionsKeys().includes(newAction)
        || !stage
        || !getStagesKeys().includes(stage)
    )
        throw Error('Invalid argument')


    if (actions.length > 0 && actions[actions.length -1].action === newAction) {
        actions[actions.length -1].time = new Date().toISOString();
        actions[actions.length -1].stage = stage;
        return [...actions];
    }

    return [...actions, {action: newAction, time: new Date().toISOString(), stage}];
}

/**
 *
 * @param {ActionLog[]} actions
 * @returns {Pomodoro[]}
 */
export function getPomodorsFromActions(actions) {
    const pomodoros = [];
    actions.forEach((value, index) => {
        switch (value.action) {
            case 'start':
                pomodoros.push({stage: value.stage, state: 'active', duration: 0});
                break;
            case 'pause':
                const startDate = new Date(actions[index - 1].time);
                const pauseDate = new Date(value.time);

                pomodoros[pomodoros.length - 1].duration += (pauseDate.getTime() - startDate.getTime()) / 1000;
                pomodoros[pomodoros.length - 1].state = 'paused';
                break;
            case 'stop':
                let durationAdded = 0;
                if (actions[index - 1].action !== 'pause') {
                    const startDate = new Date(actions[index - 1].time);
                    const stopDate = new Date(value.time);

                    durationAdded = (stopDate.getTime() - startDate.getTime()) / 1000;
                }

                pomodoros[pomodoros.length - 1].duration += durationAdded;
                pomodoros[pomodoros.length - 1].state = 'completed';
                break;
        }

        if (!actions[index+1] && pomodoros[pomodoros.length - 1].state === 'active') {
            const dateStart = new Date(value.time);
            pomodoros[pomodoros.length -1].duration = (new Date().getTime() - dateStart.getTime()) / 1000;
        }
    });

    return pomodoros;
}