import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Discipline, ListTask, TaskToSend} from "../../types/Task.ts";
import {AxiosResponse} from "axios";
import CSSInput from "../../CSS/CSS-input.ts";
import CSSButton from "../../CSS/CSS-button.ts";
import cookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import Convert from "../../components/Convert.ts";
import TaskService from "../../services/TaskService.ts";

const Task = () => {
    const { idTask }= useParams();
    const idUser = cookiesConfiguration.getCookie("login");
    const navigate = useNavigate();

    // for input
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | undefined>(undefined);
    const [inputName, setInputName] = useState<string>("");

    // to save all the tasks associate with the user id (and then update or delete a task)
    const [allTheTasks, setAllTheTasks] = useState<TaskToSend>(null);

    // const [currentTask, setCurrentTask] = useState<ITaskData>(initialTaskState);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if(idUser)
            getTask(Number(idUser));
    }, [idUser]);

    // get method to have the task
    const getTask = (id: number) => {
        TaskService.getUserData(id)
            .then((response: AxiosResponse) => {
                setInputName(response.data.taskName[idTask]);
                setSelectedDiscipline(response.data.taskDiscipline[idTask]);
                setAllTheTasks({
                    id: id,
                    taskName: response.data.taskName,
                    taskDate: response.data.taskDate,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                });
                console.log("getTask : ")
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log("get fnctionne pas");
                console.log(e);
            });
    };




    const updateTutorial = () => {
        // early return
        if(selectedDiscipline == null) {
            console.error("L'utilisateur n'a pas sélectionné de discipline");
            setMessage("No discipline selected.");
            return;
        }
        if(inputName === "") {
            console.error("L'utilisateur n'a pas donné de nom à sa tâche");
            setMessage("No name for the task, how dare you ?")
            return;
        }

        const taskToSend: TaskToSend = allTheTasks;
        taskToSend.taskName[idTask?.toString()] = inputName;
        taskToSend.taskDiscipline[idTask?.toString()] = selectedDiscipline;

        TaskService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.log("update task : ");
                console.debug(response);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const serviceTaskList = (taskToSend: TaskToSend, method: string) => {
        console.log(taskToSend);
        TaskService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                // console.debug(response.data.taskAchievement);
                if(method == "delete") {
                    navigate("/");
                }
            })
            .catch((e: Error) => {
                console.log("erreur");
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        const listAllTheTasks: Array<ListTask> | null = Convert.TaskToSendToListTask(allTheTasks);

        console.log("taskTosEnd");

        if(listAllTheTasks?.length > 1) {
            const taskToSend: TaskToSend = {
                id: Number(idUser),
                taskName: {0: allTheTasks.taskName[0]},
                taskAchievement: {0: allTheTasks.taskAchievement[0]},
                taskDiscipline: {0: allTheTasks.taskDiscipline[0]},
                taskDate: {0: allTheTasks.taskDate[0]}
            }

            let m = 0;
            for(let i =0; i<listAllTheTasks?.length; i++) {
                if(i !== Number(idTask)) {
                    taskToSend.taskName[m] = allTheTasks.taskName[i];
                    taskToSend.taskDate[m] = allTheTasks.taskDate[i];
                    taskToSend.taskDiscipline[m] = allTheTasks.taskDiscipline[i];
                    taskToSend.taskAchievement[m] = allTheTasks.taskAchievement[i];

                    m++;
                }
            }
            console.log(taskToSend);
            serviceTaskList(taskToSend, "delete");
        }
        else {
            const taskToSend = {
                id: Number(idUser),
                taskName: {},
                taskDiscipline: {},
                taskAchievement: {},
                taskDate: {}
            };
            console.log(taskToSend);
            serviceTaskList(taskToSend, "delete");
        }
    };



    return (
        <div className="taskApp large-container-2">
            <div className="container-edit-form-1">
                <h4 className="edit-title-1">Task</h4>
                <form className="form-edit-1">
                    <div className="form-group-1">
                        <label htmlFor="name" className="form-label-1">Name : </label>
                        <input
                            type="text"
                            className="form-input-1"
                            id="name"
                            name="name"
                            value={inputName}
                            onChange={(event) => setInputName(event.target.value)}
                            style={CSSInput.inputGeneralSettings}
                        />
                    </div>

                    <div className="form-group-2">
                        <label htmlFor="discipline" className="form-label-2">Discipline : </label>
                    </div>
                    <div className="form-group">
                        <input
                            id="physic-checkbox"
                            style={CSSInput.inputGeneralSettings}
                            type="radio"
                            className="checkbox-control-physic"
                            name="physic-checkbox"
                            checked={selectedDiscipline === "physics"}
                            onChange={() => {
                                setSelectedDiscipline("physics");
                            }}
                            value={"physics"}
                        />
                        <label htmlFor="physic-checkbox">Physics</label>

                        <input
                            id="math-checkbox"
                            style={CSSInput.inputGeneralSettings}
                            type="radio"
                            className="checkbox-control-maths"
                            name="math-checkbox"
                            checked={selectedDiscipline === "mathematics"}
                            onChange={() => {
                                setSelectedDiscipline("mathematics");
                            }}
                            value={"mathematics"}
                        />
                        <label htmlFor="math-checkbox">Mathematics</label>
                    </div>
                </form>

                <button
                    style={CSSButton.buttonConnectionPageSettings}
                    className="edit-button-3"
                    onClick={deleteTutorial}
                >
                    Delete
                </button>

                <button
                    style={CSSButton.buttonConnectionPageSettings}
                    type="submit"
                    className="edit-button-4"
                    onClick={updateTutorial}
                >
                    Update
                </button>
                <p className="p-edit-1">{message}</p>
                <div>
                    <button
                        style={CSSButton.buttonConnectionPageSettings}

                    >
                        <Link to={"/"}>
                            Cancel
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;