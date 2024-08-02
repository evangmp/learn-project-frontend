import {ListTask, Task} from "../../types/task.ts";
import SetShowTaskOrNo from "../Date/SetShowTaskOrNo.ts";
import Convert from "../components/Convert.ts";
import SetAchievement from "../Date/SetAchievement.ts";
import SwitchFilters from "./SwitchFilters.ts";

const allTheTasksToShow = (listTask: Array<Task>) => {
    const sortedList = new Array<Task>();
    const date = new Date();

    for(let i=0; i<listTask.length; i++) {
        if(SetShowTaskOrNo.SetShowTaskOrNo(listTask[i], date)) { // boolean test if task print or no
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

const deleteTask = (listTask: Array<Task>,
                    nameTask: string,
                    dateTask: string,
                    idUser: number,
                    setAllTheTasks: (value: null | ListTask) => void,
                    setListTask: (value: null | Array<Task>) => void,
                    setListAllTheTasks: (value: null | Array<Task>) => void
                    ) => {
    const sortedList = new Array<Task>();

    for(let i =0; i<listTask.length; i++) {
        if(listTask[i].taskName != nameTask && listTask[i].taskDate != dateTask) {
            sortedList.push(listTask[i]);
        }
    }

    setListAllTheTasks(sortedList);
    setListTask(allTheTasksToShow(sortedList));

    setAllTheTasks(Convert.ListTaskToITaskData(sortedList, idUser));

    return Convert.ListTaskToITaskData(sortedList, idUser);
};

const updateTask = (
    listAllTheTasks: Array<Task>,
    listTask: Array<Task>,
    task: Task,
    setAllTheTasks: (value: null | ListTask) => void,
    setListTasks: (value: null | Array<Task>) => void, // Array<Task>
    setListAllTheTasks: (value: null | Array<Task>) => void) => {

    const state: number[] = SetAchievement.taskSetAchievement(task.taskDate, task.taskAchievement);

    for(let i =0; i<listTask.length; i++) {
        if(listTask[i] == task) {
            listTask[i].taskAchievement = state;
        }
    }

    for(let i = 0; i<listAllTheTasks.length; i++) {
        if(listAllTheTasks[i] == task) {
            listAllTheTasks[i].taskAchievement = state;
        }
    }

    setListAllTheTasks(listAllTheTasks);
    setListTasks(listTask);

    setAllTheTasks(Convert.ListTaskToITaskData(listAllTheTasks, listTask[0].id));
};

const disciplineTask = (
    listAllTheTasks: Array<Task>,
    setListTasks: (value: null | Array<Task>) => void,
    discipline: string,
    timeFilter: string) => {

    const sortedList: Array<Task> = SwitchFilters.disciplineFilter(discipline, timeFilter, allTheTasksToShow(listAllTheTasks));
    setListTasks(sortedList);
    return sortedList;
};

const timeTask = (
    listAllTheTasks: Array<Task>,
    setListTasks: (value: null | Array<Task>) => void,
    discipline: string,
    timeFilter: string
    ) => {
    const sortedList: Array<Task> = SwitchFilters.timeFilter(discipline, timeFilter, allTheTasksToShow(listAllTheTasks));
    setListTasks(sortedList);
    return sortedList;
}

const ListSort = {
    deleteTask,
    allTheTasksToShow,
    updateTask,
    disciplineTask,
    timeTask,
};

export default ListSort;