import {render, screen} from "@testing-library/react";
import StageControl from "./StageControl";
import userEvent from "@testing-library/user-event";

describe('<StageControl />', () => {
    test('Click buttons', async () => {
        let stageClicked = '';
        const stageButtonClickMock = jest.fn((stage) => (e) => {
            stageClicked = stage;
        });

        render(
            <StageControl
                stage={'work'}
                stageButtonClick={stageButtonClickMock}
            />
        );

        const user = userEvent.setup();

        const workButton = screen.getByText('Work');
        await user.click(workButton);
        expect(stageClicked).toMatch('work');

        const shortBreakButton = screen.getByText('Short break');
        await user.click(shortBreakButton);
        expect(stageClicked).toMatch('short_break');

        const longBreakButton = screen.getByText('Long break');
        await user.click(longBreakButton);
        expect(stageClicked).toMatch('long_break');
    });

    test('Work button highlighted', async() => {
        render(
            <StageControl
                stage={'work'}
                stageButtonClick={jest.fn()}
            />
        );

        const workButton = screen.getByText('Work');
        const shortBreakButton = screen.getByText('Short break');
        const longBreakButton = screen.getByText('Long break');

        expect(workButton).toHaveClass('MuiButton-contained');
        expect(shortBreakButton).toHaveClass('MuiButton-outlined');
        expect(longBreakButton).toHaveClass('MuiButton-outlined');
    });

    test('Short Break button highlighted', async() => {
        render(
            <StageControl
                stage={'short_break'}
                stageButtonClick={jest.fn()}
            />
        );

        const workButton = screen.getByText('Work');
        const shortBreakButton = screen.getByText('Short break');
        const longBreakButton = screen.getByText('Long break');

        expect(workButton).toHaveClass('MuiButton-outlined');
        expect(shortBreakButton).toHaveClass('MuiButton-contained');
        expect(longBreakButton).toHaveClass('MuiButton-outlined');
    });

    test('Long Break button highlighted', async() => {
        render(
            <StageControl
                stage={'long_break'}
                stageButtonClick={jest.fn()}
            />
        );

        const workButton = screen.getByText('Work');
        const shortBreakButton = screen.getByText('Short break');
        const longBreakButton = screen.getByText('Long break');

        expect(workButton).toHaveClass('MuiButton-outlined');
        expect(shortBreakButton).toHaveClass('MuiButton-outlined');
        expect(longBreakButton).toHaveClass('MuiButton-contained');
    });
});

