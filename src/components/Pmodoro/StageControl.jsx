import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

const StageControl = () => {
    return <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button>Work</Button>
        <Button>Short break</Button>
        <Button>Long break</Button>
    </ButtonGroup>;
}

export default StageControl