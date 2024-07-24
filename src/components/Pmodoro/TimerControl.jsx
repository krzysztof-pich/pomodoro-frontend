import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {getActions} from "../../services/configuration";

const TimerControl = ({actions, actionButtonClick}) => {
    const actionButtons = getActions();

    const action = () => {
        if (actions.length < 1) {
            return 'stop';
        }

        return actions[actions.length - 1].action;
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