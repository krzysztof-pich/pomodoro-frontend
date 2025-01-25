import {getProgressInPercentage} from "./progress";
import {getWorkTimeInMinutes} from "./configuration";

describe('Progress testing', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:00:00Z'));
    });

    test('get 0% progress for just started pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:00:00Z'}
        ];

        expect(getProgressInPercentage('work', actions)).toEqual(0);
    });

    test('get 50% progress for half-time pomodoro', () => {
        const startTime = new Date('2024-07-22T11:47:30Z');

        const actions = [
            {action: 'start', stage: 'work', time: startTime.toISOString()}
        ];

        expect(getProgressInPercentage('work', actions)).toEqual(50);
    });

    test('get 100% progress for overlapped pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T11:00:56Z'},
        ];

        expect(getProgressInPercentage('work', actions)).toEqual(100);
    });

    test('get progress for paused pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T12:24:56Z'},
            {action: 'pause', stage: 'work', time: '2024-07-22T12:29:56Z'}
        ];

        // 5 minutes out of 25 minutes = 20% progress
        expect(getProgressInPercentage('work', actions)).toEqual(20);
    });

    test('get progress for completed pomodoro', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T11:00:56Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T11:25:56Z'},
        ];

        // Full 25 minutes = 100% progress
        expect(getProgressInPercentage('work', actions)).toEqual(0);
    });
});
