import React, {CSSProperties, useEffect} from "react";
import ListFunctions from "../../components/ListFunctions.ts";

interface SetSpaceTimeListProps {
    dayTaskAppear: number[],
    setSaveButton : React.Dispatch<React.SetStateAction<boolean>>,
    setSaveButtonStyle: React.Dispatch<React.SetStateAction<CSSProperties>>,
    setDayTaskAppear:  React.Dispatch<React.SetStateAction<number[]>>,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

const SetSpaceTimeList = ({dayTaskAppear, setDayTaskAppear, setRefresh, setSaveButtonStyle, setSaveButton}: SetSpaceTimeListProps) => {
    // to update the dayWhereTaskAppear variable when user change value of number input
    const updateDayTaskAppear = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDayTaskAppear: number[] = dayTaskAppear;

        // check if the number is already present or no
        if(ListFunctions.checkIsPresent(newDayTaskAppear, Number(e.target.value))) {
            setSaveButtonStyle({backgroundColor: 'red'});
        }
        else {
            setSaveButtonStyle({backgroundColor: 'white'});
        }

        newDayTaskAppear[index] = Number(e.target.value);

        // sort the list each time (lot of calculation so see that)
        setDayTaskAppear(ListFunctions.sortNumber(newDayTaskAppear));
        setRefresh(true);

        // because of modification
        setSaveButton(true);
    };

    // to set the add button when the page is launch and checked box button list
    useEffect(() => {
        addDayTaskAppear(0);
    }, []);

    // add button style and if he needs to be disabled (the day is already in the list)
    const [styleAddButton, setStyleAddButton] = React.useState<React.CSSProperties>({backgroundColor: 'white'});
    const [addButtonDisabled, setAddButtonDisabled] = React.useState<boolean>(true);

    const [addValue, setAddValue] = React.useState<number>(0);

    // when the value of the day to add is updated
    const addDayTaskAppear = (value: number) => {
        // update the value inside the add
        setAddValue(value);

        if(ListFunctions.checkIsPresent(dayTaskAppear, Number(value))) {
            setStyleAddButton({backgroundColor: 'red'});
            setAddButtonDisabled(true);
        }
        else {
            setStyleAddButton({backgroundColor: 'white'});
            setAddButtonDisabled(false);
        }
    };

    // add the new value in the list
    const addButtonTaskAppear = () => {
        // update list with the new value
        const newDayTaskAppear: number[] = dayTaskAppear;
        newDayTaskAppear.push(addValue);
        setDayTaskAppear(ListFunctions.sortNumber(newDayTaskAppear));

        // refresh the list to see the update, reset the add value to 0 and set add button CSS
        addDayTaskAppear(0);
    };

    // onClick to delete a day
    const deleteButton = (index: number) => {
        const newDayTaskAppear: number[] = dayTaskAppear;
        newDayTaskAppear.splice(index, 1);
        setDayTaskAppear(newDayTaskAppear);

        addDayTaskAppear(0);
        setRefresh(true);
    }

    return (
        <div>
            <p>By day scale and number of repetition : </p>
            <ul>
                {dayTaskAppear && dayTaskAppear.map((day: number, index: number) => (
                    <div key={index}>
                        <button onClick={() => deleteButton(index)}>
                            Delete
                        </button>
                        <label htmlFor={"space-time-revision" + index}>{index + 1} : </label>
                        <input type="number"
                               name={"space-time-revision" + index}
                               id={"space-time-revision" + index}
                               value={day}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDayTaskAppear(e, index)}
                               min={0}
                               max={720}
                        />
                    </div>
                ))}

            </ul>

            <div>
                <label htmlFor={"space-time-revision-add"}>
                    <button style={styleAddButton} disabled={addButtonDisabled} onClick={addButtonTaskAppear}>
                        Add
                    </button>
                </label>
                <input type="number"
                       id={"space-time-revision-add"}
                       name={"space-time-revision-add"}
                       value={addValue}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => addDayTaskAppear(Number(e.target.value))}
                       min={0}
                       max={720}
                />
            </div>
        </div>
    )
};

export default SetSpaceTimeList;