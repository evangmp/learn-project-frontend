import {ListTask} from "../../types/task.ts";
import setAchievement from "../Date/SetAchievement.ts";

// take as an argument a list and return only the task that are not checked in the list
const activeTasks = (listTask: Array<ListTask>) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    for(let i:number = 0; i < listTask.length; i++) {
        if(!setAchievement.SetDefaultChecked(listTask[i].taskDate, listTask[i].taskAchievement)) {
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

// take as an argument a list and return only the task that are checked in the list
const completedTasks = (listTask: Array<ListTask>) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    for(let i: number = 0; i<listTask.length; i++) {
        if(setAchievement.SetDefaultChecked(listTask[i].taskDate, listTask[i].taskAchievement)) {
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

const disciplineFilter = (discipline: string, time: string, listAllTheTasks: ListTask[]) => {
    const sortedList: ListTask[] = new Array<ListTask>();
    let preSortedList: ListTask[] = new Array<ListTask>();

    switch(time) {
        case "All":
            preSortedList = listAllTheTasks;
            if(discipline == "None") {
                return listAllTheTasks;
            }
            break;

        case "Active":
            preSortedList = activeTasks(listAllTheTasks);
            if(discipline == "None") {
                return preSortedList;
            }
            break;

        case "Completed":
            preSortedList = completedTasks(listAllTheTasks);
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

const timeFilter = (discipline: string, time: string, listAllTheTasks: ListTask[]) => {
    let sortedList: ListTask[] = new Array<ListTask>();

    if(discipline == "None") {
        switch (time) {
            case "All":
                return listAllTheTasks;

            case "Active":
                sortedList = activeTasks(listAllTheTasks);
                break;

            case "Completed":
                sortedList = completedTasks(listAllTheTasks);
                break;
        }
    }
    else {
        const preSortedList: ListTask[] = new Array<ListTask>();

        for(let i: number = 0; i < listAllTheTasks.length; i++) {
            if(listAllTheTasks[i].taskDiscipline == discipline) {
                preSortedList.push(listAllTheTasks[i]);
            }
        }

        switch(time) {
            case "All":
                sortedList = preSortedList;
                break;

            case "Active":
                sortedList = activeTasks(preSortedList);
                break;

            case "Completed":
                sortedList = completedTasks(preSortedList);
                break;
        }
    }
    return sortedList;
}

const SwitchFilters = {
    disciplineFilter,
    timeFilter,
};

export default SwitchFilters;