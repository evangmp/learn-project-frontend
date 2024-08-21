export type Discipline = "physics" | "mathematics";

export type AchievementTable = [number, number, number, number, number, number, number, number, number, number]

export interface ITaskData {
    id?: number,
    taskName: Map<number, string>,
    taskDiscipline: Map<number, Discipline>,
    taskAchievement: Map<number, [number, number, number, number, number, number, number, number, number, number]>,
    taskDate: Map<number, string>,
}


export interface ListTask {
    id?: number,
    index: number,
    taskName: string,
    taskDiscipline: Discipline,
    taskAchievement: AchievementTable,
    taskDate: string,
}

export interface Tasks {
    id?: number,
    taskName: string[],
    taskDiscipline : Discipline[],
    taskAchievement: AchievementTable[],
    taskDate: string[],
}

export interface DateType {
    taskIndex: number[],
    difference: number[],
    taskAchievement: AchievementTable[],
    taskAchievementIndex: number[],
    defaultChecked: boolean[],
    late: boolean[],
}