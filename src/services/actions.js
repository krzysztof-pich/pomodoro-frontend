/**
 * @param {{action, time: string}[]} actions
 * @param newAction
 */
export function updateActionsArray(actions, newAction) {
    if (actions[actions.length -1].action === newAction) {
        actions[actions.length -1].time = new Date().toString();
        return [...actions];
    }

    return [...actions, {action: newAction, time: new Date().toString()}];
}