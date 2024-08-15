import {render, screen} from "@testing-library/react";

import StageStatistics from "./StageStatistics";



describe('<StageStatistcs />', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2024-07-22T08:00:00Z'));
    });

    test('No pomodoros', () => {
        render(<StageStatistics actions={[]} />);

        const statisticsBox = screen.getByTestId('pomodoro-statistics-box');
        expect(statisticsBox.childElementCount).toBe(0);
    });

    test('single active pomodoro running', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T07:45:00'}
        ];
        render(<StageStatistics actions={actions} />);

        const pomodoroIndicator = screen.getByText('(...P...)');
        expect(pomodoroIndicator).toBeInTheDocument();
    });
    test('two pomodoros - one finished and one running', () => {
        const actions = [
            {action: 'start', stage: 'work', time: '2024-07-22T07:20:00Z'},
            {action: 'stop', stage: 'work', time: '2024-07-22T07:45:00Z'},
            {action: 'start', stage: 'short_break', time: '2024-07-22T07:45:00Z'},
            {action: 'stop', stage: 'short_break', time: '2024-07-22T07:50:00Z'},
            {action: 'start', stage: 'work', time: '2024-07-22T07:50:00Z'},
        ];

        render(<StageStatistics actions={actions} />);

        const statisticsBox = screen.getByTestId('pomodoro-statistics-box');
        expect(statisticsBox.firstChild.textContent).toBe('(P)');
        expect(statisticsBox.children[1].textContent).toBe('(...P...)');
    })
});