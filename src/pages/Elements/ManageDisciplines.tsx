import React from "react";
import CSSDiv from "../../CSS/CSS-div.ts";
import ListFunctions from "../../components/ListFunctions.ts";

interface ManageDisciplinesProps {
    disciplines: string[],
    setDisciplines: React.Dispatch<React.SetStateAction<string[]>>,
    setRefresh : React.Dispatch<React.SetStateAction<boolean>>,
}

const ManageDisciplines = ({disciplines, setDisciplines, setRefresh}: ManageDisciplinesProps) => {
    // if a discipline is selected
    const [disciplineSelected, setDisciplineSelected] = React.useState<boolean>(false);
    // if a discipline is editable
    const [disciplineEditable, setDisciplineEditable] = React.useState<boolean>(false);
    // value of the discipline (if selected)
    const [disciplineValue, setDisciplineValue] = React.useState<string>('');
    // index in disciplines string[] of the discipline
    const [disciplineIndex, setDisciplineIndex] = React.useState<number>(-1);

    // if the condition are good to edit the discipline
    const [showEditField, setShowEditField] = React.useState<boolean>(false);

    // add a discipline field
    const [addValue, setAddValue] = React.useState<string>('');
    const [addEnabled, setAddEnabled] = React.useState(false);

    // delete button
    const [deleteEnabled, setDeleteEnabled] = React.useState(false);

    const disciplineChoose = (discipline: string, index: number) => {
        setDisciplineSelected(true);
        setDisciplineValue(discipline);
        setDisciplineIndex(index);

        if(disciplines.length == 1 ) {
            setDeleteEnabled(false);
        }
        else {
            setDeleteEnabled(true);
        }
    };

    const disciplineEdit = (value: string) => {
        setDisciplineValue(value);
        const present: boolean = ListFunctions.checkIsPresentString(disciplines, value);
        if(present || value == "") {
            setDisciplineEditable(false);
        }
        else {
            setDisciplineEditable(true);
        }
    };

    const editNameDiscipline = () => {
        const newDisciplinesList: string[] = disciplines;
        newDisciplinesList[disciplineIndex] = disciplineValue;

        setDisciplines(newDisciplinesList);
        setRefresh(true);
    };

    const addInput = (value: string) => {
        setAddValue(value);

        const present: boolean = ListFunctions.checkIsPresentString(disciplines, value);

        if(present || value == "") {
            setAddEnabled(false);
        }
        else {
            setAddEnabled(true);
        }
    };

    const addOnClick = () => {
        const newDisciplines: string[] = disciplines;
        newDisciplines.push(addValue);
        setDisciplines(newDisciplines);

        setRefresh(true);
        setAddValue('');
        setAddEnabled(false);

    };

    const deleteTask = () => {
        const newDisciplines: string[] = new Array<string>();

        for(let i = 0; i < disciplines.length; i++) {
            if(i !== disciplineIndex) {
                newDisciplines.push(disciplines[i]);
            }
        }
        setDisciplines(newDisciplines);
        setRefresh(true);
    };

    return(
        <div>
            <div style={CSSDiv.alignElements}>
                <label id={'disciplines-select'}>Select here : </label>
                <select name={'disciplines'} id={'disciplines-select'}>
                    <option value={""} onClick={() => {
                        setDisciplineSelected(false);
                        setDeleteEnabled(false);
                        setShowEditField(false);
                    }}>Please choose a discipline here</option>
                    {disciplines && disciplines.map((discipline: string, index: number) => (
                        <option key={index} value={discipline} onClick={() => disciplineChoose(discipline, index)}>{discipline}</option>
                    ))}
                </select>
            </div>

            <div hidden={!showEditField}>
                <input type={'text'}
                       value={disciplineValue}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => disciplineEdit(e.target.value)}
                />
                <button disabled={!disciplineEditable} onClick={editNameDiscipline}>Save</button>
            </div>

            <div style={CSSDiv.alignElements}>
                <button disabled={!disciplineSelected} onClick={() => setShowEditField(!showEditField)}>
                    Edit
                </button>
                <button disabled={!deleteEnabled} onClick={deleteTask}>
                    Delete
                </button>
            </div>

            <div style={CSSDiv.alignElements}>
                <label htmlFor={"add-discipline"}>Add a discipline : </label>
                <input type={'text'} id={'add-discipline'}
                       value={addValue}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => addInput(e.target.value)}/>
                <button disabled={!addEnabled} onClick={addOnClick}>Add</button>
            </div>
        </div>
    )
};

export default ManageDisciplines;