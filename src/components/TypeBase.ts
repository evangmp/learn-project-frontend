import {DateType, Tasks} from "../types/task.ts";

const TasksBase = (idUser: number): Tasks => {
    return {
        id: idUser,
        taskName: [],
        taskAchievement: [],
        taskDiscipline: [],
        taskDate: [],
    }
};

const DateBase = (): DateType => {
    return {
        taskIndex: [],
        taskAchievement: [],
        difference: [],
        defaultChecked: [],
        taskAchievementIndex: [],
        late: [],
    }
}

const TypeBase = {
    TasksBase,
    DateBase
};

export default TypeBase;