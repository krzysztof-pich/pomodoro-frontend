import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import {getStages} from "../../services/configuration";

const StageControl = ({stage, stageButtonClick}) => {
    const stageButtons = getStages();

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