import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

const StageControl = () => {
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
                <Button variant="outlined">Work</Button>
                <Button variant="outlined">Short break</Button>
                <Button variant="outlined">Long break</Button>
            </Box>
        </div>
    );




}

export default StageControl