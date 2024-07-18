import StageControl from "./StageControl";
import TimerControl from "./TimerControl";
import Timer from "./Timer";
import {Box} from "@mui/material";
import {useState} from "react";

const Pomodoro = () => {
    const [stage, setStage] = useState('work');
    const [actions, setActions] = useState([]);

    const handleStageClick = (newStage) => (e) => {
        console.log('click stage', newStage);
        e.preventDefault();
        setStage(newStage);
    };

    const handleActionClick = (newAction) => (e) => {
        console.log('action click', newAction);
    }

    return (
        <Box className="pomodoro-content" sx={{ flexDirection: "column" }} display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <StageControl
                stage={stage}
                stageButtonClick={handleStageClick}
            />
            <Timer />
            <TimerControl
                actions={actions}
                actionButtonClick={handleActionClick}
            />
        </Box>
    )
}

export default Pomodoro