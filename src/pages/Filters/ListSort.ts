import {ListTask, TaskToSend} from "../../types/task.ts";
import SetShowTaskOrNo from "../../Date/SetShowTaskOrNo.ts";
import Convert from "../../components/Convert.ts";
import SetAchievement from "../../Date/SetAchievement.ts";
import SwitchFilters from "./SwitchFilters.ts";

// to set all the tasks who need to be show
const allTheTasksToShow = (listTask: Array<ListTask>) => {
    const sortedList = new Array<ListTask>();
    const date = new Date();

    for(let i=0; i<listTask.length; i++) {
        if(SetShowTaskOrNo.SetShowTaskOrNo(listTask[i], date)) { // boolean test if task print or no
            sortedList.push(listTask[i]);
        }
    }
    return sortedList;
};

// delete a task, with the index, and to refresh all the lists
const deleteTask = (listTask: Array<ListTask>,
                    index: number,
                    idUser: number,
                    setAllTheTasks: (value: null | TaskToSend) => void,
                    setListTask: (value: null | Array<ListTask>) => void,
                    setListAllTheTasks: (value: null | Array<ListTask>) => void
                    ) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    if(listTask.length == 1) {
        return {
            id: idUser,
            taskName: {},
            taskDiscipline: {},
            taskAchievement: {}, taskDate: {}
        };
    }

    for(let i =0; i<listTask.length; i++) {
        if(i !== index) {
            sortedList.push(listTask[i]);
        }
    }

    setListAllTheTasks(sortedList);
    setListTask(allTheTasksToShow(sortedList));

    setAllTheTasks(Convert.ListTaskToITaskData(sortedList, idUser));

    return Convert.ListTaskToITaskData(sortedList, idUser);
};

// to modify a task and refresh all the lists
const updateTask = (
    listAllTheTasks: Array<ListTask>,
    listTask: Array<ListTask>,
    task: ListTask,
    setAllTheTasks: (value: null | TaskToSend) => void,
    setListTasks: (value: null | Array<ListTask>) => void, // Array<Task>
    setListAllTheTasks: (value: null | Array<ListTask>) => void) => {

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

// when a discipline filter is used
const disciplineTask = (
    listAllTheTasks: Array<ListTask>,
    setListTasks: (value: null | Array<ListTask>) => void,
    discipline: string,
    timeFilter: string) => {

    const sortedList: Array<ListTask> = SwitchFilters.disciplineFilter(discipline, timeFilter, allTheTasksToShow(listAllTheTasks));
    setListTasks(sortedList);
    return sortedList;
};

// when a completed/active filter is used
const timeTask = (
    listAllTheTasks: Array<ListTask>,
    setListTasks: (value: null | Array<ListTask>) => void,
    discipline: string,
    timeFilter: string
    ) => {
    const sortedList: Array<ListTask> = SwitchFilters.timeFilter(discipline, timeFilter, allTheTasksToShow(listAllTheTasks));
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