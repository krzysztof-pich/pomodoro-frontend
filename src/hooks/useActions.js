import { useState } from 'react';

export const useActions = () => {
    const [actions, setActions] = useState([]);
    const [stage, setStage] = useState(false);



    return {actions, stage};
};

export default useActions;