import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AvTimerIcon from '@mui/icons-material/AvTimer';

const Header = () => {
    return (
        <Box component="header" className="pomodoro-header">
            <Toolbar>
                <IconButton><AvTimerIcon/></IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Pomodoro
                </Typography>
            </Toolbar>
        </Box>
    )
}

export default Header