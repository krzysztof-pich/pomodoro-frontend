import {Box} from "@mui/material";
import {useEffect, useState} from "react";

import StageControl from "./StageControl";
import TimerControl from "./TimerControl";
import Timer from "./Timer";
import {updateActionsArray} from "../../services/actions";

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('permission granted');
            } else {
                console.log('permission declined');
            }
        });
    }
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