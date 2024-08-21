import CSSButton from "../../CSS/CSS-button.ts";
import React from "react";

interface TasksParametersButtonProps {
    setTasksParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const TasksParametersButton = ({setTasksParameters}: TasksParametersButtonProps) => {

    return(
        <button style={CSSButton.buttonConnectionPageSettings}
                className="connection-button"
                onClick={() => setTasksParameters(true)}>
            Tasks parameters
        </button>
    )
};

export default TasksParametersButton;