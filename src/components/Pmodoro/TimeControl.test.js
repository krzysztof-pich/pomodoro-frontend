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

    test('render started action controls', async () => {
        const actionButtonClick = jest.fn();
        const actions = [
            {action: 'start', time: new Date().toString()}
        ];

        render(<TimerControl actions={actions} actionButtonClick={actionButtonClick}/>);
        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        const pauseButton = screen.getByText('Pause');

        expect(startButton).not.toBeVisible();
        expect(stopButton).toBeVisible();
        expect(pauseButton).toBeVisible();
    });

    test('render paused action controls', async () => {
        const actionButtonClick = jest.fn();
        const actions = [
            {action: 'start', time: new Date().toString()},
            {action: 'pause', time: new Date().toString()}
        ];

        render(<TimerControl actions={actions} actionButtonClick={actionButtonClick}/>);
        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        const pauseButton = screen.getByText('Pause');

        expect(startButton).toBeVisible();
        expect(stopButton).toBeVisible();
        expect(pauseButton).not.toBeVisible();
    });
});