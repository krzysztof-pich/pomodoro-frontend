/**
 * @typedef {import('../typedefs').ActionLog} ActionLog
 * @typedef {import('../typedefs').Pomodoro} Pomodoro
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
export function getPomodorsFromActions(actions) { return[]; }