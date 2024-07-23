import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimerControl from './TimerControl';

describe('<TimeControl /> buttons visibility', () => {
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
describe('<TimeControl /> buttons click', () => {
    test('click start button', async () => {
        let actionClicked = '';
        const actionButtonClick = jest.fn((stage) => e => {
            actionClicked = stage;
        });


        render(
            <TimerControl
                actions={[]}
                actionButtonClick={actionButtonClick}
            />
        );

        const user = userEvent.setup();
        const startButton = screen.getByText('Start');
        await user.click(startButton);
        expect(actionClicked).toMatch('start');
    });

    test('click pause and stop button', async () => {
        let actionClicked = '';
        const actionButtonClick = jest.fn((stage) => e => {
            actionClicked = stage;
        });

        render(
            <TimerControl
                actions={[{action: 'start', time: new Date().toString()}]}
                actionButtonClick={actionButtonClick}
            />
        );

        const user = userEvent.setup();

        const stopButton = screen.getByText('Stop');
        await user.click(stopButton);
        expect(actionClicked).toMatch('stop');

        const pauseButton = screen.getByText('Pause');
        await user.click(pauseButton);
        expect(actionClicked).toMatch('pause');
    });
});