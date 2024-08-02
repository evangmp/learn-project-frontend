import {Task} from "../../types/task.ts";
import setAchievement from "../Date/SetAchievement.ts";

// take as an argument a list and return only the task that are not checked in the list
const activeTasks = (listTask: Array<Task>) => {
    const sortedList: Task[] = new Array<Task>();

    for(let i:number = 0; i < listTask.length; i++) {
        if(!setAchievement.SetDefaultChecked(listTask[i].taskDate, listTask[i].taskAchievement)) {
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

// take as an argument a list and return only the task that are checked in the list
const completedTasks = (listTask: Array<Task>) => {
    const sortedList: Task[] = new Array<Task>();

    for(let i: number = 0; i<listTask.length; i++) {
        if(setAchievement.SetDefaultChecked(listTask[i].taskDate, listTask[i].taskAchievement)) {
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

const disciplineFilter = (discipline: string, time: string, listAllTheTasks: Task[]) => {
    const sortedList: Task[] = new Array<Task>();
    let preSortedList: Task[] = new Array<Task>();

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

const timeFilter = (discipline: string, time: string, listAllTheTasks: Task[]) => {
    let sortedList: Task[] = new Array<Task>();

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
        const preSortedList: Task[] = new Array<Task>();

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