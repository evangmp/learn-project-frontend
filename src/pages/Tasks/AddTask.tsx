import React, {useEffect, useState} from "react";
import {Discipline, ListTask} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import SecurityService from "../../services/AuthentificationService.ts";

const AddTask = () => {
    const { idUser}= useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(idUser)
            getUserTask(Number(idUser));
    }, [idUser]);

    // boolean to set the discipline checkboxes
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | undefined>(undefined);
    const [inputName, setInputName] = useState<string>("");

    const [taskSaved, setTaskSaved] = useState<boolean>(false);

    // initialization for setAllTheTasks
    const id_user: number = Number(idUser);
    const [allTheTasks, setAllTheTasks] = useState<ListTask>(null);

    // get method to have all the tasks
    const getUserTask = (id_user: number) => {
        if(id_user < 0 || id_user == null) {
            console.log("non non non");
            return;
        }
        SecurityService.getUserData(id_user)
            .then((response: AxiosResponse) => {
                console.log("getUsertask, addtask : ")
                console.log(response.data.taskName);
                setAllTheTasks({
                    id: id_user,
                    taskName: response.data.taskName,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                    taskDate: response.data.taskDate,
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const resetInputs = () => {
        setTaskSaved(!taskSaved);
        setSelectedDiscipline(undefined);
        setInputName("");
    };

    // to set for post method and save the new task
    const submitTask = () => {
        // early return
        if (selectedDiscipline == null) {
            console.error("L'utilisateur n'a pas sélectionné de discipline");
            return;
        }
        if (inputName === "") {
            console.error("L'utilisateur n'a pas donné de nom à sa tâche");
            return;
        }
        if(id_user < 0 || id_user == null) {
            console.error("id non conforme");
            return;
        }

        let size: number = 0;
        while(allTheTasks.taskName[size.toString()] !== undefined) {
            size +=1;
        }

        const listToSend: ListTask = allTheTasks;
        listToSend.taskName[size.toString()] = inputName;
        listToSend.taskDiscipline[size.toString()] = selectedDiscipline;
        listToSend.taskDate[size.toString()] = new Date().toLocaleString();
        listToSend.taskAchievement[size.toString()] = [0, 0, 0, 0, 0, 0,0 ,0 ,0, 0]

        TaskDataService.createUserTask(listToSend)
            .then((response: AxiosResponse) => {
                console.log("create User Task, add task : ")
                console.debug(response);
                resetInputs();
            })
            .catch((e: Error) => {
                console.log("erreur add taks post");
                console.error(e);
            });
    };

    const navigationButton = (link: string) => {
        navigate(link);
    };

    return (
        <div className="submit-form">
            {taskSaved ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button
                        style={CSSConstants.buttonGeneralSettings}
                        className="btn btn-success"
                        onClick={resetInputs}
                    >
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Enter Name : </label>
                        <input
                            style={CSSConstants.inputGeneralSettings}
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={inputName}
                            onChange={(event) => {
                                setInputName(event.target.value);
                            }}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="choice">Choose a discipline : </label>
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
                    <button
                        style={CSSConstants.buttonMainPageSettings}
                        onClick={submitTask}
                        className="btn btn-success"
                    >
                        Submit
                    </button>
                        <button
                            style={CSSConstants.buttonMainPageSettings}
                            onClick={() => navigationButton("/home/" + Number(idUser))}
                        >
                            Return back
                        </button>
                </div>
            )}
        </div>
    );
};

export default AddTask;