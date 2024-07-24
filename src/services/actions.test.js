import {updateActionsArray} from "./actions";

describe('Actions testing', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    });

    test('Adding actions', () => {
        const startingTimeString = new Date('2022-01-01 00:00').toISOString();
        const actions = [
            {action: 'start', time: new Date().toISOString()},
            {action: 'stop', time: startingTimeString}
        ];

        const newActions = updateActionsArray(actions, 'stop');
        expect(newActions.length).toEqual(2);
        expect(newActions[1].time).toEqual(new Date().toISOString());
    });

    test('Adding new action', () => {
        const actions = [
            {action: 'start', time: new Date().toISOString()},
            {action: 'stop', time: new Date().toISOString()}
        ];

        const newActions = updateActionsArray(actions, 'start');
        expect(newActions.length).toEqual(3);
        expect(newActions[2].action).toEqual('start');
        expect(newActions[2].time).toEqual(new Date().toISOString());
    });
})