import {useNavigate} from "react-router-dom";
import TaskService from "../../services/TaskService.ts";
import {AxiosResponse} from "axios";
import {Tasks} from "../../types/task.ts";

const Error = () => {
    const navigate = useNavigate();

    const sendData = (date: string) => {

        console.log(date);

        const listToSend: Tasks = {
            id: 3,
            taskName: ["prout", "test"],
            taskDiscipline: ["mathematics", "physics"],
            taskDate: ["2024-08-15T00:00:00Z", "2024-08-14T22:05:38Z"],
            taskAchievement: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        };

        TaskService.createUserTask(listToSend)
            .then((response: AxiosResponse) => {
                console.log("create User Task, add task : ")
                console.debug(response);
            })
            .catch((e: Error) => {
                console.log("erreur add taks post");
                console.error(e);
            })
    }

    const button = () => {
        sendData(JSON.stringify(new Date().toLocaleString()))
    }


    return (
        <div>
            <div>
                <p>
                    you shouldn't be here
                </p>
            </div>

            <div>
                <button onClick={() => button()}>
                    test
                </button>
            </div>

            <div>
                <button onClick={() => navigate("/")}>
                    go home
                </button>
            </div>
        </div>
    )
};

export default Error;