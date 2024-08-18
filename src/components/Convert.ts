import {ListTask, Tasks} from "../types/task.ts";

// to convert a ListTask data type => TaskToSend type
const ListTaskToTasks = (listTask: Array<ListTask>, idUser: number) => {
    if(listTask.length == 0) {
        return null;
    }

    const listITaskData: Tasks = {
        id: idUser,
        taskName: [listTask[0].taskName],
        taskDiscipline: [listTask[0].taskDiscipline],
        taskAchievement: [listTask[0].taskAchievement],
        taskDate: [listTask[0].taskDate],
    };

    for(let q = 1; q < listTask.length; q++) {
        listITaskData.taskName.push(listTask[q].taskName);
        listITaskData.taskDiscipline.push(listTask[q].taskDiscipline);
        listITaskData.taskAchievement.push(listTask[q].taskAchievement);
        listITaskData.taskDate.push(listTask[q].taskDate);
    }

    return listITaskData;
};


// to convert a TaskToSend data type => ListTask type
const TasksToListTask = (taskToSend: Tasks) => {
    if(taskToSend == null) {
        return null;
    }

    const initializationTaskList: Array<ListTask> = [];

    for(let m = 0; m < taskToSend.taskName.length; m++) {
        initializationTaskList.push({
                taskAchievement: taskToSend.taskAchievement[m],
                id: taskToSend.id,
                index: m,
                taskName: taskToSend.taskName[m],
                taskDiscipline: taskToSend.taskDiscipline[m],
                taskDate: taskToSend.taskDate[m]
            }
        )
    }

    return initializationTaskList;
};

const Convert = {
    ListTaskToTasks,
    TasksToListTask,
};

export default Convert;