import { Box, LinearProgress } from "@mui/material";
import {useEffect, useState} from "react";
import {getProgressInPercentage} from "../../services/progress";

const Progress = ({ stage, actions }) => {
    // This can be calculated based on stage and actions later
    const progress = 56;

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <LinearProgress 
                variant="determinate" 
                value={getProgressInPercentage(stage, actions)}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#90caf9',
                        borderRadius: 5,
                    }
                }}
            />
        </Box>
    );
};

export default Progress;