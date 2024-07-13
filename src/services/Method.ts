import {Discipline} from "../types/task.ts";
import TaskDataService from "../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";

// update task method, link with back
const updateTask = (name: string, discipline: Discipline, achievement: number[], allTheTasks, idUser: number, idTask: number) => {
    const nameTasks: Map<number, string> = new Map();
    const disciplineTasks: Map<number, Discipline> = new Map();
    const achievementTasks: Map<number, [number, number, number, number, number, number, number, number, number, number]> = new Map();
    const dateTasks: Map<number, string> = new Map();

    console.log(allTheTasks);

    // have the number of tasks
    let i: number = 0;
    while(allTheTasks.taskName[i] !== undefined) {i++;}

    // to set Map, with new data for the task which is update and same data for other task
    let p: number = 0;
    while(allTheTasks.taskName[p] !== undefined) {
        if(p == idTask) {
            nameTasks.set(Number(p), name);
            disciplineTasks.set(Number(p), discipline);
            achievementTasks.set(Number(p), allTheTasks.taskAchievement[p]);
            dateTasks.set(Number(p), allTheTasks.taskDate[p]);
        }
        else {
            nameTasks.set(Number(p), allTheTasks.taskName[p]);
            disciplineTasks.set(Number(p), allTheTasks.taskDiscipline[p]);
            achievementTasks.set(Number(p), allTheTasks.taskAchievement[p]);
            dateTasks.set(Number(p), allTheTasks.taskDate[p]);
        }
        console.log(nameTasks.get(p));
        p++
    }

    // preparation of data to send
    const taskToSend = {
        id: Number(idUser),
        taskName: {0: nameTasks.get(0)},
        taskDiscipline: {0: disciplineTasks.get(0)},
        taskAchievement: {0: achievementTasks.get(0)},
        taskDate: {0: dateTasks.get(0)},
    };

    let q = 1;
    while(nameTasks.get(q) !== undefined) {
        taskToSend.taskName[q.toString()] = nameTasks.get(q);
        taskToSend.taskDiscipline[q.toString()] = disciplineTasks.get(q);
        taskToSend.taskAchievement[q.toString()] = achievementTasks.get(q);
        taskToSend.taskDate[q.toString()] = dateTasks.get(q);
        console.log(q + " + " + nameTasks.get(q));
        q++;
    }

    TaskDataService.updateTask(taskToSend)
        .then((response: AxiosResponse) => {
            console.debug(response);
        })
        .catch((e: Error) => {
            console.log(e);
        });
};

const Method = {
    updateTask,
}

export default Method;