import { render, screen } from '@testing-library/react';
import TimerControl from './TimerControl';

describe('<TimeControl />', () => {
    test('render controls on empty actions', async () => {
        const actionButtonClick = jest.fn();
        const actions = [];

        render(<TimerControl actions={actions} actionButtonClick={actionButtonClick}/>);
        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        const pauseButton = screen.getByText('Pause');

        expect(startButton).toBeVisible();
        expect(stopButton).not.toBeVisible();
        expect(pauseButton).not.toBeVisible();
    });
});