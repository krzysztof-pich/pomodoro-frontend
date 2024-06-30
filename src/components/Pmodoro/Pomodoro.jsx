import StageControl from "./StageControl";
import TimerControl from "./TimerControl";
import Timer from "./Timer";
import {Box} from "@mui/material";

const Pomodoro = () => {
    return (
        <Box sx={{ flexDirection: "column" }} display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <StageControl/>
            <Timer />
            <TimerControl />
        </Box>
    )
}

export default Pomodoro