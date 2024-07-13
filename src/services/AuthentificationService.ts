import http from "../http-common.ts";
import IAccountData from "../types/account.ts";
import ISignInData from "../types/signIn.ts";
import {ITaskData} from "../types/task.ts";

// different method with the security backend

const signUp = (data: IAccountData) => {
    return http.post<IAccountData>("/auth/signup", data);
}

const signIn = (data: ISignInData) => {
    return http.post<ISignInData>("/auth/signin", data);
}

const getAllUserData = () => {
    return http.get<Array<ITaskData>>("/auth/tasks");
}

const getUserData = (id: number) => {
    return http.get<ITaskData>(`/auth/tasks/${id}`);
}

const createUserTask = (data: any) => {
    return http.post<ITaskData>("/auth/create", data);
}

const deleteTest = (data: any, idTask: number) => {
    return http.post<ITaskData>(`auth/delete/${idTask}`, data);
}

const updateTask = (data: any) => {
    return http.post<ITaskData>("auth/update", data);
}

const SecurityService = {
    signUp,
    signIn,
    getAllUserData,
    getUserData,
    createUserTask,
    deleteTest,
    updateTask,
};

export default SecurityService;