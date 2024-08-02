import {ListTask, Task} from "../../types/task.ts";

const ListTaskToITaskData = (listTask: Array<Task>, idUser: number) => {
    if(listTask.length == 0) {
        return null;
    }

    const listITaskData: ListTask = {
        id: idUser,
        taskName: {0: listTask[0].taskName},
        taskDiscipline: {0: listTask[0].taskDiscipline},
        taskAchievement: {0: listTask[0].taskAchievement},
        taskDate: {0: listTask[0].taskDate},
    };

    let i = 1;

    while(listTask[i] != undefined) {
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
}

const Convert = {
    ListTaskToITaskData,
};

export default Convert;