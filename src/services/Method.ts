import TaskDataService from "../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";

const AccountInitialisation = (id: number) => {
    const data = {
        id: id,
        taskName: {0: "exemple Task"},
        taskDate: {0: new Date().toLocaleString()},
        taskAchievement: {0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        taskDiscipline: {0: "mathematics"},
    };

    TaskDataService.createUserTask(data)
        .then((response: AxiosResponse) => {
            console.debug(response);
        })
        .catch((e: Error) => {
            console.log(e);
        });
}

const Method = {
    AccountInitialisation,
}

export default Method;