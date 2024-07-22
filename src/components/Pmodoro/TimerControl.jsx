import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const TimerControl = ({actions, actionButtonClick}) => {
    const actionButtons = [
        { name: 'start', label: 'Start', visibility: ['stop', 'pause'] },
        { name: 'pause', label: 'Pause', visibility: ['start'] },
        { name: 'stop', label: 'Stop', visibility: ['start', 'pause'] },
    ]

    const action = (actions) => {
        if (!actions) {
            return 'stop';
        }
    };

    return (
        <div style={{width: '100%'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    columnGap: '10px'
                }}
            >
                {
                    actionButtons.map((actionItem) =>
                        <Button
                            key={actionItem.name}
                            onClick={actionButtonClick(actionItem.name)}
                            sx={actionItem.visibility.includes(action()) ? {} : { display: 'none' } }
                            variant="outlined"
                        >
                            {actionItem.label}
                        </Button>
                    )
                }
            </Box>
        </div>
    );
}

TimerControl.propTypes = {
    actions: PropTypes.array,
    actionButtonClick: PropTypes.func
};

export default TimerControl