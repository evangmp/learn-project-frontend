import http from "../http-common.ts";
import IAccountData from "../types/account.ts";
import ISignInData from "../types/signIn.ts";
import {ITaskData} from "../types/task.ts";

const signUp = (data: IAccountData) => {
    return http.post<IAccountData>("/auth/signup", data);
}

const signIn = (data: ISignInData) => {
    return http.post<ISignInData>("/auth/signin", data);
}

const deleteToken = (id: number) => {
    return http.post<ITaskData>("/auth/deletetoken", id);
}

const SecurityService = {
    signUp,
    signIn,
    deleteToken,
};

export default SecurityService;