import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ITaskData, Discipline} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts"
import CSSConstants from "../components/CSSConstants.ts"
import {AxiosResponse} from "axios";

const Task = () => {
    const { idtask, iduser }= useParams();
    const navigate = useNavigate();

    // for input
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | undefined>(undefined);
    const [inputName, setInputName] = useState<string>("");

    // to save all the tasks associate with the user id (and then update or delete a task)
    const [allTheTask, setAllTheTask] = useState<ITaskData>(null);
    const nameTasks: Map<number, string> = new Map();
    const disciplineTasks: Map<number, Discipline> = new Map();
    const achievementTasks: Map<number, [number, number, number, number, number, number, number, number, number, number]> = new Map();
    const dateTasks: Map<number, string> = new Map();


    // const [currentTask, setCurrentTask] = useState<ITaskData>(initialTaskState);
    const [message, setMessage] = useState<string>("");

    // get method to have the task
    const getTask = (id: number) => {
        TaskDataService.getUserData(id)
            .then((response: AxiosResponse) => {
                setInputName(response.data.taskName[idtask]);
                setSelectedDiscipline(response.data.taskDiscipline[idtask]);

                setAllTheTask({
                    id: id,
                    taskName: response.data.taskName,
                    taskDate: response.data.taskDate,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => { // voir comment ça fonctionne
        if(iduser)
            getTask(Number(iduser));
    }, [iduser, idtask]);


    const updateTutorial = () => {
        if(selectedDiscipline == null) {
            console.error("L'utilisateur n'a pas sélectionné de discipline");
            return;
        }
        if(inputName === "") {
            console.error("L'utilisateur n'a pas donné de nom à sa tâche");
            return;
        }

        // have the
        let i: number = 0;
        while(allTheTask.taskName[i] !== undefined) {i++;}
        console.log(i);

        i = 0;
        while(allTheTask.taskName[i] !== undefined) {
            if(i == idtask) {
                nameTasks.set(Number(i), inputName);
                disciplineTasks.set(Number(i), selectedDiscipline);
                achievementTasks.set(Number(i), allTheTask.taskAchievement[i]);
                dateTasks.set(Number(i), allTheTask.taskDate[i]);
            }
            else {
                nameTasks.set(Number(i), allTheTask.taskName[i]);
                disciplineTasks.set(Number(i), allTheTask.taskDiscipline[i]);
                achievementTasks.set(Number(i), allTheTask.taskAchievement[i]);
                dateTasks.set(Number(i), allTheTask.taskDate[i]);
            }
            console.log(nameTasks.get(i));
            i++
        }

        const nouveaulasuite = {
            id: Number(iduser),
            taskName: {0: allTheTask.taskName[0]},
            taskDiscipline: {0: allTheTask.taskDiscipline[0]},
            taskAchievement: {0: allTheTask.taskAchievement[0]},
            taskDate: {0: allTheTask.taskDate[0]},
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

        const taskToSend = {
            id: Number(iduser),
            taskName: nameTasks,
            taskDiscipline: disciplineTasks,
            taskDate: dateTasks,
            taskAchievement: achievementTasks,
        };
        console.log(nouveaulasuite);


        TaskDataService.createUserTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.debug(response);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        TaskDataService.deleteTest(allTheTask, Number(idtask))
            .then((response: AxiosResponse) => {
                console.log(response.data);
                navigate("/home/");
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
                    <button style={CSSConstants.buttonConnectionPageSettings}>
                        <Link to={"/home/"}>
                            Cancel
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;