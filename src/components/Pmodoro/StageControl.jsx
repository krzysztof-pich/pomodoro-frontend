import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const StageControl = ({stage, stageButtonClick}) => {
    const stageButtons = [
        { name: 'work', label: 'Work'},
        { name: 'short_break', label: 'Short break' },
        { name: 'long_break', label: 'Long break' },
    ];

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
                {
                    stageButtons.map((stageItem) =>
                        <Button
                            key={stageItem.name}
                            onClick={stageButtonClick(stageItem.name)}
                            variant={stageItem.name === stage ? "contained" : "outlined"}>
                                {stageItem.label}
                        </Button>
                    )
                }
            </Box>
        </div>
    );
}

StageControl.propTypes = {
    stage: PropTypes.string,
    stageButtonClick: PropTypes.func,
}

export default StageControl