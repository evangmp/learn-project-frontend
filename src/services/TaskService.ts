import http from "../http-common.ts";
import {ITaskData} from "../types/task.ts";

const getUserData = (id: number) => {
    return http.get<ITaskData>(`/auth/tasks/${id}`);
}

const createUserTask = (data: any) => {
    return http.post<ITaskData>("/auth/create", data);
}

const updateTask = (data: any) => {
    return http.post<ITaskData>("auth/update", data);
}

const TaskService = {
    getUserData,
    createUserTask,
    updateTask,
};

export default TaskService;