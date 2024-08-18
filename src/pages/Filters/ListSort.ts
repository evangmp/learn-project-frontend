import {DateType, ListTask} from "../../types/task.ts";

// to set all the tasks who need to be show
const taskToShow = (dateTable: DateType, listTask: Array<ListTask>) => {
    const sortedList = new Array<ListTask>();

    for(let i=0; i < listTask.length; i++) {
        if(dateTable.taskAchievementIndex[listTask[i].index] >= 0) {
            sortedList.push(listTask[i]);
        }
    }

    return sortedList;
}

// delete a task, with the index, and to refresh all the lists
const deleteTask = (listTask: Array<ListTask>, index: number, idUser: number) => {
    const sortedList: ListTask[] = new Array<ListTask>();

    if(listTask.length == 1) {
        return {
            id: idUser,
            taskName: [],
            taskDiscipline: [],
            taskAchievement: [],
            taskDate: []
        };
    }

    for(let i = 0; i < listTask.length; i++) {
        if(i !== index) {
            sortedList.push(listTask[i]);
        }
    }

    return sortedList;
};

const ListSort = {
    deleteTask,
    taskToShow,
};

export default ListSort;