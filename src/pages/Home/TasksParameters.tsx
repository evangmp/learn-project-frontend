import React, {CSSProperties} from "react";

interface TasksParametersProps {
    setTasksParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const TasksParameters = ({setTasksParameters} : TasksParametersProps) => {
    const backgroundColor:CSSProperties = {
        backgroundColor: 'grey',
        position: 'relative',
    };

    const textColor: CSSProperties = {
        color: 'white',
    };

    return(
        <div style={backgroundColor}>
            <p style={textColor}>Tasks Parameters</p>

            <p>Task</p>
            <div>
                <span>
                    Set space time revision
                </span>
                <button>
                    button_1
                </button>
            </div>

            <div>
                <span>
                    Manage disciplines
                </span>
                <button>
                    button_2
                </button>
            </div>

            <div>
                <span>
                    Divide by chapter a discipline
                </span>
                <button>
                    button_3
                </button>
            </div>

            <p>Filters</p>
            <div>
                <span>
                    Filters favorite disciplines
                </span>
                <button>
                    button_4
                </button>
            </div>

            <div>
                <span>
                    Tasks recall
                </span>
                <button>
                    button_5
                </button>
            </div>

            <button onClick={() => setTasksParameters(false)}>Close</button>
        </div>
    )
};

export default TasksParameters;