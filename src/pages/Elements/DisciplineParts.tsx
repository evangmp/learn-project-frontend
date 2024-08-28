import CSSDiv from "../../CSS/CSS-div.ts";
import React from "react";
import ListFunctions from "../../components/ListFunctions.ts";

interface DisciplinePartsProps {
    disciplines: string[],
    disciplinesParts: string[][],
    setDisciplinesParts:  React.Dispatch<React.SetStateAction<string[][]>>,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const DisciplineParts = ({disciplines, disciplinesParts, setDisciplinesParts, setRefresh}: DisciplinePartsProps) => {
    // set the index of the actual selected discipline
    const [indexDiscipline, setIndexDiscipline] = React.useState<number>(-1);

    // if a discipline is selected then show the parts
    const [disciplineSelected, setDisciplineSelected] = React.useState<boolean>(false);

    // if there is part(s) or no
    const [isParts, setIsParts] = React.useState<boolean>(false);

    const selectDiscipline = (index: number) => {
        setDisciplineSelected(true);
        setPartToAddLegit(false);
        setAddPartValue('');

        setIndexDiscipline(index);
        if(disciplinesParts[index].length == 0) {
            setIsParts(false);
        }
        else {
            setIsParts(true);
        }
    };

    // if a part is selected then show edit and delete buttons and save the index
    const [partSelected, setPartSelected] = React.useState<boolean>(false);
    const [partIndex, setPartIndex] = React.useState<number>(-1);
    const [addPartValue, setAddPartValue] = React.useState<string>("");
    const [partToAddLegit, setPartToAddLegit] = React.useState<boolean>(false);

    const [editPart, setEditPart] = React.useState<boolean>(false);
    const [editValue, setEditValue] = React.useState<string>('');
    const [editValid, setEditValid] = React.useState(false);

    const selectPart = (index: number) => {
        setPartSelected(true);
        setPartIndex(index);
        setEditValue(disciplinesParts[indexDiscipline][index]);
    };

    const addInput = (value: string) => {
       setAddPartValue(value);
       const present: boolean = ListFunctions.checkIsPresentString(disciplinesParts[indexDiscipline], value);

       if(present || value == '') {
           setPartToAddLegit(false);
       }
       else {
           setPartToAddLegit(true);
       }
    }

    const addPart = () => {
        const newDisciplinesParts: string[][] = disciplinesParts;
        newDisciplinesParts[indexDiscipline].push(addPartValue);

        setDisciplinesParts(newDisciplinesParts);
        setRefresh(true);
        setAddPartValue('');
    }; // reste à voir lorque initialement pas de partie, une fois ajoutée refresh

    const onChangeEdit = (value: string) => {
        setEditValue(value);

        const present: boolean = ListFunctions.checkIsPresentString(disciplinesParts[indexDiscipline], value);
        if(present || value == '') {
            setEditValid(false);
        }
        else {
            setEditValid(true);
        }
    };

    const editParts = () => {
        const newDisciplinesParts: string[][] = disciplinesParts;

        newDisciplinesParts[indexDiscipline][partIndex] = editValue;
        setDisciplinesParts(newDisciplinesParts);
        setRefresh(true);
        setEditValid(false);
    };

    console.log(indexDiscipline);
    const deleteParts = () => {
        const newDisciplinesParts: string[][] = [];

        for(let i = 0; i < disciplinesParts.length; i++) {
            if(i != indexDiscipline) {
                newDisciplinesParts.push(disciplinesParts[i]);
            }
            else {
                const temporaryTable: string[] = [];
                for(let j = 0; j < disciplinesParts[i].length; j++) {
                    if(j !== partIndex) {
                        temporaryTable.push(disciplinesParts[i][j]);
                    }
                }
                newDisciplinesParts.push(temporaryTable);
            }
        }

        setDisciplinesParts(newDisciplinesParts);
        setRefresh(true);
    };

    return (
        <div>
            <div style={CSSDiv.alignElements}>
                <label id={'disciplines-select'}>Select here : </label>
                <select name={'disciplines'} id={'disciplines-select'}>
                    <option value={""} onClick={() => {
                        setDisciplineSelected(false);
                        setEditPart(false); setEditValue('');
                    }}>Please choose a discipline here</option>
                    {disciplines && disciplines.map((discipline: string, index: number) => (
                        <option key={index} value={discipline} onClick={() => selectDiscipline(index)}>{discipline}</option>
                    ))}
                </select>
            </div>

            {disciplineSelected ?
                <div style={CSSDiv.alignElements}>
                    <label id={'disciplines-parts-select'}>Parts : </label>
                    {isParts ?

                        <select name={'disciplines-parts'} id={'disciplines-parts-select'}>
                            <option value={""} onClick={() => {
                                setPartSelected(false);
                                setEditValue('');
                                setEditPart(false);
                            }}>Please choose a part here</option>
                            {disciplinesParts[indexDiscipline] && disciplinesParts[indexDiscipline].map((part: string, index: number) => (
                                <option key={index} value={part} onClick={() => selectPart(index)}>{part}</option>
                            ))}

                        </select> :
                            <p>None</p>}

                    <button hidden={!partSelected} onClick={() => setEditPart(!editPart)}>
                        Edit
                    </button>

                    <button hidden={!partSelected} onClick={() => deleteParts()}>
                        Delete
                    </button>

                    <div>
                        <button disabled={!partToAddLegit} onClick={addPart}>Add</button>
                        <input type={'text'}
                               value={addPartValue}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => addInput(e.target.value)}/>
                    </div>
                </div> : null}

            {editPart ?
                <div>
                    <span>Edit here</span>
                    <input type={'text'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEdit(e.target.value)}
                           value={editValue}/>
                    <button disabled={!editValid} onClick={() => editParts()}>Valid</button>
                </div> : null}
        </div>
    )
};

export default DisciplineParts;