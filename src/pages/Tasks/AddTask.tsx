import React, {useState} from "react";
import {ITaskData, Discipline} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {Link} from "react-router-dom";
import {AxiosResponse} from "axios";
import SecurityService from "../../services/AuthentificationService.ts";

const AddTask = () => {
    // boolean to set the discipline checkboxes
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | undefined>(undefined);
    const [inputName, setInputName] = useState<string>("");

    const [taskSaved, setTaskSaved] = useState<boolean>(false);
    const [firstTask, setFirstTask] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<number>(null);

    // initialization of setallthetasks
    const id_user: number = idUser;
    const nameTasks: Map<number, string> = new Map();
    const disciplineTasks: Map<number, Discipline> = new Map();
    const achievementTasks: Map<number, [number, number, number, number, number, number, number, number, number, number]> = new Map();
    const dateTasks: Map<number, string> = new Map();
    const allTheTaskInitialState: ITaskData = {
        id: id_user,
        taskName: nameTasks,
        taskDiscipline: disciplineTasks,
        taskAchievement: achievementTasks,
        taskDate: dateTasks,
    };
    const [allTheTasks, setAllTheTasks] = useState<ITaskData>(allTheTaskInitialState);


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

    // get method to have all the other tasks
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
                console.log(response.data.taskName === {});
                if(!(response.data.taskName === {})) {
                    setFirstTask(true);
                }
                else {
                    setFirstTask(false);
                }
                console.log(firstTask);

            })
            .catch((e: Error) => {
                console.log(e);
                console.log("erreur venant du get addtask");

            });
    };

    const resetInputs = () => {
        setTaskSaved(!taskSaved);
        setSelectedDiscipline(undefined);
        setInputName("");
        setIdUser(0);
    };

    // post method to save the new task
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
            console.log("non non non2");
            return;
        }

        // initialize setAllTasks
        getUserTask(id_user);

        console.log(firstTask);

        if(allTheTasks.taskName[0]) {
            setFirstTask(false);
            console.log("yes");
        }

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

        // to have the size of all the tasks already presents
        let i: number = 0;
        while (allTheTasks.taskName[i] !== undefined) {
            i++;
        }

        let o = 0;
        while(allTheTasks.taskName[o] !== undefined) {
            nameTasks.set(o, allTheTasks.taskName[o]);
            disciplineTasks.set(o, allTheTasks.taskDiscipline[o]);
            achievementTasks.set(o, allTheTasks.taskAchievement[o]);
            dateTasks.set(o, allTheTasks.taskDate[o]);
            console.log(o + " : " + nameTasks.get(o));
            o++;
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
                    <div>
                        <label htmlFor="id_choice">
                            enter an id :
                        </label>
                        <input
                            style={CSSConstants.inputGeneralSettings}
                            type="number"
                            id="id_choice"
                            onChange={(event) => {
                                setIdUser(Number(event.target.value));
                            }}
                        />
                        <button onClick={() => {
                            console.log("id : " + idUser);
                        }}>
                            ok
                        </button>
                    </div>

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
                                getUserTask(id_user);
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
                        style={CSSConstants.buttonGeneralSettings}
                        onClick={submitTask}
                        className="btn btn-success"
                    >
                        Submit
                    </button>
                    <a>
                        <Link to={"/home"}>Return back</Link>
                    </a>
                </div>
            )}
        </div>
    );
};

export default AddTask;