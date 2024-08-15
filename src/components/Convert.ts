import {ListTask, TaskToSend} from "../types/task.ts";

// to convert a ListTask data type => TaskToSend type
const ListTaskToITaskData = (listTask: Array<ListTask>, idUser: number) => {
    if(listTask.length == 0) {
        return null;
    }

    const listITaskData: TaskToSend = {
        id: idUser,
        taskName: {0: listTask[0].taskName},
        taskDiscipline: {0: listTask[0].taskDiscipline},
        taskAchievement: {0: listTask[0].taskAchievement},
        taskDate: {0: listTask[0].taskDate},
    };

    let i = 1;

    while(listTask[i] !== undefined) {
        i++;
    }

    let q = 1;

    while(q<i) {
        listITaskData.taskName[q.toString()] = listTask[q].taskName;
        listITaskData.taskDiscipline[q.toString()] = listTask[q].taskDiscipline;
        listITaskData.taskAchievement[q.toString()] = listTask[q].taskAchievement;
        listITaskData.taskDate[q.toString()] = listTask[q].taskDate;
        q++;
    }

    return listITaskData;
};

// to convert a TaskToSend data type => ListTask type
const TaskToSendToListTask = (taskToSend: TaskToSend) => {
    if(taskToSend == null) {
        return null;
    }

    const initializationTaskList: Array<ListTask> = [];

    let i = 0;

    while(taskToSend.taskName[i] !== undefined) {
        i++;
    }

    for(let m = 0; m<i; m++) {
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
}



const Convert = {
    ListTaskToITaskData,
    TaskToSendToListTask,
};

export default Convert;