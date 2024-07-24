import {updateActionsArray} from "./actions";

describe('Actions testing', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    });

    test('Adding stop action if already stoped', () => {
        const startingTimeString = new Date('2022-01-01 00:00').toISOString();
        const actions = [
            {action: 'start', time: new Date().toISOString(), stage: 'work'},
            {action: 'stop', time: startingTimeString, stage: 'work'}
        ];

        const newActions = updateActionsArray(actions, 'stop', 'short_break');
        expect(newActions.length).toEqual(2);
        expect(newActions[1].time).toEqual(new Date().toISOString());
        expect(newActions[1].stage).toEqual('short_break');
    });

    test('Adding new action', () => {
        const actions = [
            {action: 'start', time: new Date().toISOString(), stage: 'work'},
            {action: 'stop', time: new Date().toISOString(), stage: 'work'},
        ];

        const newActions = updateActionsArray(actions, 'start', 'short_break');
        expect(newActions.length).toEqual(3);
        expect(newActions[2].action).toEqual('start');
        expect(newActions[2].time).toEqual(new Date().toISOString());
        expect(newActions[2].stage).toEqual('short_break');
    });

    test('Adding action on empty actions', () => {
        const newActions = updateActionsArray([], 'start', 'short_break');
        expect(newActions.length).toEqual(1);
        expect(newActions[0].action).toEqual('start');
        expect(newActions[0].time).toEqual(new Date().toISOString());
        expect(newActions[0].stage).toEqual('short_break');
    })

    test('Missing arguments cause error throw', () => {
        expect(() => updateActionsArray([])).toThrow('Invalid argument');
        expect(() => updateActionsArray([], 'x')).toThrow('Invalid argument');
        expect(() => updateActionsArray([], 'start')).toThrow('Invalid argument');
        expect(() => updateActionsArray([], 'start', 'x')).toThrow('Invalid argument');
    })
})