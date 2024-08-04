import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Discipline, ListTask} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {AxiosResponse} from "axios";

const Task = () => {
    const { idTask, idUser }= useParams();
    const navigate = useNavigate();

    // for input
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | undefined>(undefined);
    const [inputName, setInputName] = useState<string>("");

    // to save all the tasks associate with the user id (and then update or delete a task)
    const [allTheTasks, setAllTheTasks] = useState<ListTask>(null);

    // const [currentTask, setCurrentTask] = useState<ITaskData>(initialTaskState);
    const [message, setMessage] = useState<string>("");

    // get method to have the task
    const getTask = (id: number) => {
        TaskDataService.getUserData(id)
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

    useEffect(() => { // voir comment ça fonctionne
        if(idUser)
            getTask(Number(idUser));
    }, [idUser, idTask]);


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

        const taskToSend: ListTask = allTheTasks;
        taskToSend.taskName[idTask?.toString()] = inputName;
        taskToSend.taskDiscipline[idTask?.toString()] = selectedDiscipline;

        TaskDataService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.log("update task : ");
                console.debug(response);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        TaskDataService.deleteTest(allTheTasks, Number(idTask))
            .then((response: AxiosResponse) => {
                console.log("delete : ");
                console.log(response.data);
                navigate("/home/" + idUser);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="taskApp large-container-2">
            <div className="container-edit-form-1">
                <h4 className="edit-title-1">Tutorial</h4>
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
                            style={CSSConstants.inputGeneralSettings}
                        />
                    </div>

                    <div className="form-group-2">
                        <label htmlFor="discipline" className="form-label-2">Discipline : </label>
                    </div>
                    <div className="form-group">
                        <input
                            id="physic-checkbox"
                            style={CSSConstants.inputGeneralSettings}
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
                            style={CSSConstants.inputGeneralSettings}
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
                    style={CSSConstants.buttonConnectionPageSettings}
                    className="edit-button-3"
                    onClick={deleteTutorial}
                >
                    Delete
                </button>

                <button
                    style={CSSConstants.buttonConnectionPageSettings}
                    type="submit"
                    className="edit-button-4"
                    onClick={updateTutorial}
                >
                    Update
                </button>
                <p className="p-edit-1">{message}</p>
                <div>
                    <button
                        style={CSSConstants.buttonConnectionPageSettings}

                    >
                        <Link to={"/home/" + Number(idUser)}>
                            Cancel
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;