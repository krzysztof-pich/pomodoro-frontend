import Button from "@mui/material/Button";
import {Box} from "@mui/material";

const TimerControl = () => {
    return (
        <div style={{width: '100%'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                }}
            >
                <Button variant="outlined">start</Button>
                <Button variant="outlined">pause</Button>
                <Button variant="outlined">stop</Button>
            </Box>
        </div>
    );
}

export default TimerControl