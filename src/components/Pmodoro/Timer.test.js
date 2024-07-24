import {getWorkTimeInMinutes, getShortBreakTimeInMinutes, getLongBreakTimeInMinutes} from "../../services/configuration";
import Timer from "./Timer";
import {render, screen} from "@testing-library/react";


jest.mock('../../services/configuration', () => ({
    getWorkTimeInMinutes: jest.fn(),
    getLongBreakTimeInMinutes: jest.fn(),
    getShortBreakTimeInMinutes: jest.fn(),
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
    // beforeAll(() => {
    //     jest.useFakeTimers('modern');
    //     jest.setSystemTime(new Date('2024-07-22T12:34:56Z'));
    // });
    //
    // test('render started work timer', () => {
    //     getWorkTimeInMinutes.mockReturnValue(25);
    //
    //     render(
    //         <Timer
    //             stage={'work'}
    //             actions={[{action: 'start', time: '2024-07-22T12:29:56Z'}]}
    //         />
    //     );
    //
    //     const timer = screen.getByText('20:00');
    //     expect(timer).toBeInTheDocument();
    // });
})