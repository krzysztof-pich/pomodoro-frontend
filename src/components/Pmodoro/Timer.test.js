import {render, screen} from "@testing-library/react";

import Timer from "./Timer";
import {getWorkTimeInMinutes, getShortBreakTimeInMinutes, getLongBreakTimeInMinutes, getStageName} from "../../services/configuration";
import {triggerNotification} from "../../services/notifications";

jest.mock('../../services/configuration', () => ({
    getWorkTimeInMinutes: jest.fn(),
    getLongBreakTimeInMinutes: jest.fn(),
    getShortBreakTimeInMinutes: jest.fn(),
    getStageName: jest.fn(),
}));

jest.mock('../../services/notifications', () => ({
    triggerNotification: jest.fn(),
}));

describe('<Timer /> timer rendering on different stages', () => {
    test('render work timer on empty actions', () => {
        getWorkTimeInMinutes.mockReturnValue(25);

        render(
             <Timer
                 stage={'work'}
                 actions={[]}
             />
        );

        const timer = screen.getByText('25:00');
        expect(timer).toBeInTheDocument();
    });

    test('render long break timer', () => {
        getLongBreakTimeInMinutes.mockReturnValue(15);

        render(
            <Timer
                stage={'long_break'}
                actions={[]}
            />
        );

        const timer = screen.getByText('15:00');
        expect(timer).toBeInTheDocument();
    });

    test('render short break timer', () => {
        getShortBreakTimeInMinutes.mockReturnValue(5);

        render(
            <Timer
                stage={'short_break'}
                actions={[]}
            />
        );

        const timer = screen.getByText('5:00');
        expect(timer).toBeInTheDocument();
    });
});

describe('<Timer /> timer started and counting down', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    });

    test('20:01 left on work', () => {
        getWorkTimeInMinutes.mockReturnValue(25);

        render(
            <Timer
                stage={'work'}
                actions={[{action: 'start', stage: 'work', time: '2024-07-22T12:29:57Z'}]}
            />
        );

        const timer = screen.getByText('20:01');
        expect(timer).toBeInTheDocument();

        expect(triggerNotification).not.toBeCalled();
    });

    test('4:58 left on short break', () => {
        getShortBreakTimeInMinutes.mockReturnValue(5);

        render(
            <Timer
                stage={'short_break'}
                actions={[{action: 'start', stage: 'short_break', time: '2024-07-22T12:34:54Z'}]}
            />
        );

        const timer = screen.getByText('4:58');
        expect(timer).toBeInTheDocument();

        expect(triggerNotification).not.toBeCalled();
    });

    test('-4:33 overtime on long break', () => {
        getLongBreakTimeInMinutes.mockReturnValue(15);

        render(
            <Timer
                stage={'long_break'}
                actions={[{action: 'start', stage: 'long_break', time: '2024-07-22T12:15:23Z'}]}
            />
        );

        const timer = screen.getByText('-4:33');
        expect(timer).toBeInTheDocument();

        expect(triggerNotification).not.toBeCalled();
    });
});

describe('<Timer /> notifications triggering', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T08:00:00Z'));
    });

    test('notification triggered on 0 time', () => {
        getWorkTimeInMinutes.mockReturnValue(20);
        getStageName.mockReturnValue('Work');

        render(
            <Timer
                stage={'work'}
                actions={[{action: 'start', stage: 'work', time: '2024-07-22T07:40:00Z'}]}
            />
        );

        const timer = screen.getByText('0:00');
        expect(timer).toBeInTheDocument();
        expect(triggerNotification).toBeCalledWith('Work', 'Session finished');
    });
});