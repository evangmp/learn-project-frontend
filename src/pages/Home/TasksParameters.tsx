import React, {CSSProperties, useEffect, useState} from "react";
import ParameterOptionButton from "../Elements/ParameterOptionButton.tsx";
import SetSpaceTimeList from "../Elements/SetSpaceTimeList.tsx";
import CSSImg from "../../CSS/CSS-img.ts";
import ManageDisciplines from "../Elements/ManageDisciplines.tsx";
import DisciplineParts from "../Elements/DisciplineParts.tsx";

interface TasksParametersProps {
    setTasksParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const TasksParameters = ({setTasksParameters} : TasksParametersProps) => {
    // refresh the page
    const [refresh, setRefresh] = React.useState<boolean>(false);

    useEffect(() => {
        if(refresh)
            setRefresh(false);
            return;
    }, [refresh]);

    // for save button, style and if he needs to be show
    const [saveButton, setSaveButton] = useState<boolean>(false);
    const [saveButtonStyle, setSaveButtonStyle] = useState<CSSProperties>({backgroundColor: 'white'});

    // the boolean if a section is opened
    const [openSetSpaceTimeRevision, setOpenSetSpaceTimeRevision] = React.useState<boolean>(false);
    const [openManageDisciplines, setOpenManageDisciplines] = React.useState<boolean>(false);
    const [editDisciplineParts, setEditDisciplineParts] = React.useState<boolean>(false);

    // to set space-time revision
    const dayWhereTaskAppear: number[] = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];
    const [dayTaskAppear, setDayTaskAppear] = React.useState<number[]>(dayWhereTaskAppear);

    // to set manage disciplines
    const [disciplines, setDisciplines] = React.useState<string[]>(['mathematics', 'physics']);

    // to disciplineParts
    const initialDisciplinesParts: string[][] = [["Algebra", "Calculus"], []];
    const [disciplinesParts, setDisciplinesParts] = React.useState<string[][]>(initialDisciplinesParts);

    const backgroundColor:CSSProperties = {
        backgroundColor: 'grey',
        position: 'relative',
    };

    const textColor: CSSProperties = {
        color: 'white',
    };

    const alignButton: CSSProperties = {
        display: 'flex',
        alignItems: 'stretch',
    };

    return(
        <div style={backgroundColor}>
            <div style={alignButton}>
                <p style={textColor}>Tasks Parameters</p>
                <button style={saveButtonStyle} hidden={!saveButton}
                        onClick={() => {setSaveButton(false); setSaveButtonStyle({backgroundColor: 'white'});}}>
                    Save
                </button>
                <button onClick={() => setTasksParameters(false)}>
                    <img src={"src/assets/64498.png"} alt={"close the parameters"} style={CSSImg.forParametersArrow}/>
                </button>
            </div>

            <div>
                <p>Task</p>
                <div>
                    <ParameterOptionButton style={{backgroundColor: 'inherit', border: 'white'}}
                                           open={openSetSpaceTimeRevision}
                                           setOpen={setOpenSetSpaceTimeRevision}/>
                    <span>
                        Set space time revision
                    </span>
                </div>

                {openSetSpaceTimeRevision ?
                    <SetSpaceTimeList setRefresh={setRefresh}
                                      setSaveButton={setSaveButton}
                                      setSaveButtonStyle={setSaveButtonStyle}
                                      setDayTaskAppear={setDayTaskAppear}
                                      dayTaskAppear={dayTaskAppear}
                    /> : null}

                <div>
                    <ParameterOptionButton style={{backgroundColor: 'inherit', border: 'white'}}
                                           open={openManageDisciplines}
                                           setOpen={setOpenManageDisciplines}/>
                    <span>
                        Manage disciplines
                    </span>
                </div>

                {openManageDisciplines ?
                    <ManageDisciplines disciplines={disciplines}
                                       setDisciplines={setDisciplines}
                                       setRefresh={setRefresh}
                    /> : null}

                <div>
                    <ParameterOptionButton style={{backgroundColor: 'inherit', border: 'white'}}
                                           open={editDisciplineParts}
                                           setOpen={setEditDisciplineParts}/>
                    <span>
                        Set part in discipline
                    </span>
                </div>

                {editDisciplineParts ?
                    <DisciplineParts disciplines={disciplines}
                                     setDisciplinesParts={setDisciplinesParts}
                                     disciplinesParts={disciplinesParts}
                                     setRefresh={setRefresh}
                    /> : null}

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
            </div>
        </div>
    )
};

export default TasksParameters;