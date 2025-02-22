import {getActivePomodoro, getPomodorosFromActions, updateActionsArray} from "./actions";

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

describe('Pomodoro testing', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    });

    test('get pomodoros from empty actions', () => {
        expect(getPomodorosFromActions([])).toEqual([]);
    });

    test('get running pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:29:56Z'}
        ];

        const pomodoros = getPomodorosFromActions(actions);
        expect(pomodoros).toHaveLength(1);
        expect(pomodoros[0].stage).toEqual('work');
        expect(pomodoros[0].state).toEqual('active');
        expect(pomodoros[0].duration).toEqual(5*60);
    });

    test('get paused pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:24:56Z'},
            {action: 'pause', stage: 'work', time: '2024-07-22T12:29:56Z'}
        ];

        const pomodoros = getPomodorosFromActions(actions);
        expect(pomodoros).toHaveLength(1);
        expect(pomodoros[0].stage).toEqual('work');
        expect(pomodoros[0].state).toEqual('paused');
        expect(pomodoros[0].duration).toEqual(5*60);
    });

    test('stop after pause', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:56Z'},
            {action: 'pause', stage: 'work', time: '2024-07-22T12:20:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T12:29:56Z'},
        ];

        const pomodoros = getPomodorosFromActions(actions);
        expect(pomodoros).toHaveLength(1);
        expect(pomodoros[0]).toEqual({stage: 'work', state: 'completed', duration: 20*60})
    });

    test('get two pomodoros', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T12:25:56Z'},
            {action: 'start', stage: 'short_break', time: '2024-07-22T12:29:56Z'},
        ];

        const pomodoros = getPomodorosFromActions(actions);
        expect(pomodoros).toHaveLength(2);
        expect(pomodoros[0]).toEqual({stage: 'work', state: 'completed', duration: 25*60})
        expect(pomodoros[1]).toEqual({stage: 'short_break', state: 'active', duration: 5*60})
    });

    test('full set of pomodoros', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T11:30:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T11:54:56Z'},
            {action: 'start', stage: 'short_break', time: '2024-07-22T12:05:56Z'},
            {action: 'stop', stage: 'short_break', time: '2024-07-22T12:10:56Z'},
            {action: 'start', stage: 'long_break', time: '2024-07-22T12:14:56Z'},
            {action: 'stop', stage: 'long_break', time: '2024-07-22T12:29:56Z'},
        ];

        const pomodoros = getPomodorosFromActions(actions);
        expect(pomodoros).toHaveLength(3);
        expect(pomodoros[0]).toEqual({stage: 'work', state: 'completed', duration: 24*60})
        expect(pomodoros[1]).toEqual({stage: 'short_break', state: 'completed', duration: 5*60})
        expect(pomodoros[2]).toEqual({stage: 'long_break', state: 'completed', duration: 15*60})
    });

    test('stop action is a first one', () => {
        const actions = [
            {action: 'stop', stage: 'work', time: '2024-07-22T11:54:56Z'},
        ];

        expect(getPomodorosFromActions(actions)).toEqual([]);
    });
});

describe('Active pomodoro testing', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    });

    test('get pomodoro with empty actions', () => {
        const pomodoro = getActivePomodoro([]);
        expect(pomodoro).toEqual(false);
    });

    test('get active pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T12:25:56Z'},
            {action: 'start', stage: 'short_break', time: '2024-07-22T12:29:56Z'},
        ];

        const pomodoro = getActivePomodoro(actions);
        expect(pomodoro).toEqual({stage: 'short_break', state: 'active', duration: 5*60})
    });

    test('all pomodoros are finished', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T12:25:56Z'},
        ];

        const pomodoro = getActivePomodoro(actions);
        expect(pomodoro).toEqual(false);
    });

    test('pomodoro is paused', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:00Z'},
            {action: 'pause', stage: 'work', time: '2024-07-22T12:25:00Z'},
        ];

        const pomodoro = getActivePomodoro(actions);
        expect(pomodoro).toEqual({stage: 'work', state: 'paused', duration: 5*60})
    });

    test('pomodoro was paused', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:29:56Z'},
            {action: 'pause', stage: 'work', time: '2024-07-22T12:31:56Z'},
            {action: 'start', stage: 'work', time: '2024-07-22T12:32:56Z'},

        ];

        const pomodoro = getActivePomodoro(actions);
        expect(pomodoro).toEqual({stage: 'work', state: 'active', duration: 4*60})
    })
})