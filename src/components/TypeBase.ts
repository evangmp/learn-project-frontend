import {Tasks} from "../types/task.ts";

const TasksBase = (idUser: number): Tasks => {
    return {
        id: idUser,
        taskName: [],
        taskAchievement: [],
        taskDiscipline: [],
        taskDate: [],
    }
};

const TypeBase = {
    TasksBase
};

export default TypeBase;