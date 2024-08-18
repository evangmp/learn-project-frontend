import {DateType, ListTask} from "../../types/task.ts";
import ListSort from "./ListSort.ts";

// take as an argument a list and return only the task(s) that are not checked in the list
const activeTasks = (listTask: Array<ListTask>, dateTable: DateType) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    for(let i:number = 0; i < listTask.length; i++) {
        if(!dateTable.defaultChecked[listTask[i].index]) {
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

// take as an argument a list and return only the task(s) that are checked in the list
const completedTasks = (listTask: Array<ListTask>, dateTable: DateType) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    for(let i:number = 0; i < listTask.length; i++) {
        if(dateTable.defaultChecked[listTask[i].index]) {
            sortedList.push(listTask[i]);
        }
    }

    return sortedList;
};

// discipline filter : first, check the time (completed or not) filter and then set the list with the discipline
const disciplineFilter = (discipline: string, time: string, listAllTheTasks: ListTask[], dateTable: DateType) => {
    const listAllTheTasksToShow: ListTask[] = ListSort.taskToShow(dateTable, listAllTheTasks);

    const sortedList: ListTask[] = new Array<ListTask>();
    let preSortedList: ListTask[] = new Array<ListTask>();

    switch(time) {
        case "All":
            preSortedList = listAllTheTasksToShow;
            if(discipline == "None") {
                return listAllTheTasksToShow;
            }
            break;

        case "Active":
            preSortedList = ListSort.taskToShow(dateTable, activeTasks(listAllTheTasks, dateTable));
            if(discipline == "None") {
                return preSortedList;
            }
            break;

        case "Completed":
            preSortedList = ListSort.taskToShow(dateTable, completedTasks(listAllTheTasksToShow, dateTable));
            if(discipline == "None") {
                return preSortedList;
            }
            break;
    }

    for(let i: number = 0; i<preSortedList.length; i++) {
        if(preSortedList[i].taskDiscipline == discipline) {
            sortedList.push(preSortedList[i]);
        }
    }

    return sortedList;
}

const SwitchFilters = {
    disciplineFilter,
};

export default SwitchFilters;