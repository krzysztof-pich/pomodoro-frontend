import {updateActionsArray} from "./actions";

describe('Actions testing', () => {
    test('Adding actions', () => {
        const actions = [
            {action: 'start', time: new Date().toString()},
            {action: 'stop', time: new Date().toString()}
        ];

        const newActions = updateActionsArray(actions, 'stop');
        expect(newActions.length).toEqual(2);
        // todo - add date compare
    });

    test('Adding new action', () => {
        const actions = [
            {action: 'start', time: new Date().toString()},
            {action: 'stop', time: new Date().toString()}
        ];

        const newActions = updateActionsArray(actions, 'start');
        expect(newActions.length).toEqual(3);
        // todo - add last element check
    });
})