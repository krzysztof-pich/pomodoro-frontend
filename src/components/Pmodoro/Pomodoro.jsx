import {Box} from "@mui/material";
import {useEffect, useState} from "react";

import StageControl from "./StageControl";
import TimerControl from "./TimerControl";
import Timer from "./Timer";
import {updateActionsArray} from "../../services/actions";
import {requestPermissions} from "../../services/notifications";

function requestNotificationPermission() {
    requestPermissions();
}

const Pomodoro = () => {
    const [stage, setStage] = useState('work');
    const [actions, setActions] = useState([]);

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const handleStageClick = (newStage) => (e) => {
        e.preventDefault();

        setStage(newStage);
        setActions(updateActionsArray(actions, 'stop', newStage));
    };

    const handleActionClick = (newAction) => (e) => {
        e.preventDefault();

        setActions( updateActionsArray(actions, newAction, stage));
    }

    return (
        <Box className="pomodoro-content" sx={{ flexDirection: "column" }} display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <StageControl
                stage={stage}
                stageButtonClick={handleStageClick}
            />
            <Timer
                stage={stage}
                actions={actions}
            />
            <TimerControl
                actions={actions}
                actionButtonClick={handleActionClick}
            />
        </Box>
    )
}

export default Pomodoro