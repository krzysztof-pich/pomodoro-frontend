import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AvTimerIcon from '@mui/icons-material/AvTimer';

const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton><AvTimerIcon/></IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Pomodoro
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header