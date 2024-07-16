import React, {useEffect, useState} from "react";
import {ITaskData, Discipline} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
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
    const [firstTask, setFirstTask] = useState<boolean>(false);

    // initialization of setallthetasks
    const id_user: number = Number(idUser);
    const nameTasks: Map<number, string> = new Map();
    const disciplineTasks: Map<number, Discipline> = new Map();
    const achievementTasks: Map<number, [number, number, number, number, number, number, number, number, number, number]> = new Map();
    const dateTasks: Map<number, string> = new Map();
    const [allTheTasks, setAllTheTasks] = useState<ITaskData>(null);

    // post method to send data
    const postMethod = (taskToSend: ITaskData) => {
        TaskDataService.createUserTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.debug(response);
                resetInputs();
            })
            .catch((e: Error) => {
                console.error(e);
            });
    }

    // get method to have all the tasks
    const getUserTask = (id_user: number) => {
        if(id_user < 0 || id_user == null) {
            console.log("non non non");
            return;
        }
        SecurityService.getUserData(id_user)
            .then((response: AxiosResponse) => {
                //console.log(response.data.taskName);
                setAllTheTasks({
                    id: id_user,
                    taskName: response.data.taskName,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                    taskDate: response.data.taskDate,
                });
                if(response.data.taskName[0] == undefined) {
                    setFirstTask(true);
                }
                else {
                    setFirstTask(false);
                }
                console.log("firstTask ? " + firstTask);
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

        // initialize setAllTasks
        getUserTask(id_user);

        if(firstTask) {
            console.log("si ça passe par là c'est que c'est cet id est pas initialité");
            const taskSend = {
                id: id_user,
                taskName: {0: inputName},
                taskDiscipline: {0: selectedDiscipline},
                taskDate: {0: new Date().toLocaleString()},
                taskAchievement: {0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            };
            postMethod(taskSend);
            return;
        }

        // to have the size of all the tasks already presents (because function like size and length doesn't work) and set map
        let i: number = 0;
        while (allTheTasks.taskName[i] !== undefined) {
            nameTasks.set(i, allTheTasks.taskName[i]);
            disciplineTasks.set(i, allTheTasks.taskDiscipline[i]);
            achievementTasks.set(i, allTheTasks.taskAchievement[i]);
            dateTasks.set(i, allTheTasks.taskDate[i]);
            console.log(i + " : " + nameTasks.get(i));
            i++;
        }

        // when called, add at the of each lists the new values
        nameTasks.set(i, inputName);
        disciplineTasks.set(i, selectedDiscipline);
        achievementTasks.set(i, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        dateTasks.set(i, new Date().toLocaleString());

        const nouveaulasuite = {
            id: id_user,
            taskName: {0: allTheTasks.taskName[0]},
            taskDiscipline: {0: allTheTasks.taskDiscipline[0]},
            taskAchievement: {0: allTheTasks.taskAchievement[0]},
            taskDate: {0: allTheTasks.taskDate[0]},
        };

        let p = 1;
        while(nameTasks.get(p) !== undefined) {
            nouveaulasuite.taskName[p.toString()] = nameTasks.get(p);
            nouveaulasuite.taskDiscipline[p.toString()] = disciplineTasks.get(p);
            nouveaulasuite.taskAchievement[p.toString()] = achievementTasks.get(p);
            nouveaulasuite.taskDate[p.toString()] = dateTasks.get(p);
            console.log(p + " + " + nameTasks.get(p));
            p++;
        }
        postMethod(nouveaulasuite);
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
                                getUserTask(Number(idUser));
                                console.log("input name : " + inputName);
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