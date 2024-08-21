import {DateType, ListTask} from "../../types/task.ts";

// pour les tâches en retard gérer le fait que c'est le truc d'avant qui va prendre, ou bien lorsque en retard et doit quand
//même apparaître ne rien changer

// to set all the tasks who need to be show
const taskToShow = (dateTable: DateType, listTask: Array<ListTask>) => {
    const sortedList = new Array<ListTask>();
    const dayWhereTaskAppear: number[] = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];

    for(let i=0; i < listTask.length; i++) {
        // initially, I wanted to do a switch, but in the future I want that users can choose their own revision time space
        for(let m = 0; m < dayWhereTaskAppear.length; m++) {
            if(dateTable.difference[listTask[i].index]-1 == dayWhereTaskAppear[m] && listTask[i].taskAchievement[m] == 0) {
                console.log("oui");
                console.log(listTask[i]);
                sortedList.push(listTask[i]);
                dateTable.late[listTask[i].index] = true;
            }
        }

        if(dateTable.taskAchievementIndex[listTask[i].index] >= 0 && !dateTable.late[listTask[i].index]) {
            sortedList.push(listTask[i]);
        }

        else if(dateTable.taskAchievementIndex[listTask[i].index] >  0 && !dateTable.late[listTask[i].index]) {
            if(listTask[i].taskAchievement[dateTable.taskAchievementIndex[listTask[i].index]-1] == 0) {
                sortedList.push(listTask[i]);
            }
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