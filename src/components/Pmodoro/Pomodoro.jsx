import StageControl from "./StageControl";
import TimerControl from "./TimerControl";
import Timer from "./Timer";

const Pomodoro = () => {
    return (
        <>
            <StageControl/>
            <Timer />
            <TimerControl />
        </>
    )
}

export default Pomodoro