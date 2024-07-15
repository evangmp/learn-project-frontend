import React, {CSSProperties, useEffect, useState} from "react";
import {ITaskData, Task} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {AxiosResponse} from "axios";
import {Link, useParams} from "react-router-dom";
import SetAchievement from "../Date/SetAchievement.ts";
import Method from "../../services/Method.ts";
import SetShowTaskOrNo from "../Date/SetShowTaskOrNo.ts";

const TaskList = () => {
    const { idUser}= useParams();

    // i will see, error in console, because each child of the list don't have a unique key, so it'll be useful
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    // to set date and send it to the DateAlgo
    const [date, setDate] = useState<Date>(new Date());

    const [listTasks, setListTasks] = useState<Array<Task>>(null);
    const [allTheTasks, setAllTheTasks] = useState<ITaskData>(null);

    // when its run call the const to have all the tasks and setDate (if not date is null)
    useEffect(() => {
        setDate(new Date());
        if(idUser)
            getTask(Number(idUser));
    }, [idUser]);


    // get method to bring all the tasks from the DB
    const getTask = (idUser: number) => {
        TaskDataService.getUserData(idUser)
            .then((response: AxiosResponse) => {
                if(response.data.taskName[0] == undefined) {
                    setListTasks(null);
                    return;
                }
                let i: number = 0;
                const test: Array<Task> = [];
                while (response.data.taskName[i] !== undefined) {
                    test.push({
                        id: i,
                        taskName: response.data.taskName[i],
                        taskDiscipline: response.data.taskDiscipline[i],
                        taskAchievement: response.data.taskAchievement[i],
                        taskDate: response.data.taskDate[i],
                    });
                    i++;
                }
                setListTasks(test);
                setAllTheTasks({
                    id: idUser,
                    taskName: response.data.taskName,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                    taskDate: response.data.taskDate,
                })
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // useful to set if the task needs to be print, with DateAlgo
    const hiddenOrNo = (task: Task) => {
        // will call another const, this one will compare the date of the task and the actual date,
        // to render if the task will be print or no with a boolean
        const printOrNo = SetShowTaskOrNo.SetShowTaskOrNo(task, date);
        console.log("Task : " + task.taskName + ", is good or no : " + printOrNo);
        return printOrNo;
    };

    // set default checked or no
    const defaultChecked = (taskDate: string, taskAchievement: number[]) => {
        const state: boolean = SetAchievement.SetDefaultChecked(taskDate, taskAchievement);
        console.log("state task boolean : " + state);
        return state;
    }

    // update achievement file
    const achievementUpdate = (task: Task) => {
        const state: number[] = SetAchievement.taskSetAchievement(task.taskDate, task.taskAchievement);
        Method.updateTask(task.taskName, task.taskDiscipline, state, allTheTasks, Number(idUser), Number(task.id));
        return state;
    }

    // CSS Style
    const tasksListTitle: CSSProperties = {
        font: '3.5rem "Fira Sans", sans-serif', // "small-caps bold 24px/1 sans-serif",
    };
    const listGeneralSettings: CSSProperties = {
        listStyleType: "none",
    };
    const divTaskSetting: CSSProperties = {
        WebkitFontSmoothing: "antialiasing",
        boxSizing: "border-box",
        clear: "left",
        display: "block",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.6rem",
        fontWeight: 400,
        lineHeight: 1.25,
        minHeight: "44px",
        paddingLeft: "40px",
        position: "relative",
        flex: "0 0 100%",
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4 style={tasksListTitle}>Tasks List</h4>

                <ul className="list-group">
                    {listTasks && listTasks.map((task: Task, index: number) => (
                            <div style={{padding: '2rem'}}>
                                <li style={listGeneralSettings}
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    key={task.id}
                                    hidden={!hiddenOrNo(task)}
                                >
                                    <div style={divTaskSetting}>
                                        <input
                                            type="checkbox"
                                            defaultChecked={defaultChecked(task.taskDate, task.taskAchievement)}
                                            onChange={() => {
                                                task.taskAchievement = achievementUpdate(task);
                                            }}
                                        />
                                        <label style={CSSConstants.inputGeneralSettings}>{task.taskName}</label>
                                    </div>

                                    <div style={divTaskSetting}>
                                        <label>Discipline : {task.taskDiscipline}</label>
                                    </div>

                                    <div style={divTaskSetting}>
                                        <button /*style={CSSConstants.buttonMainPageSettings}*/>
                                            <Link
                                                to={"/home/" + idUser + "/" + task.id}
                                                className="nav-link-edit"
                                            >
                                                Edit
                                            </Link>
                                        </button>
                                    </div>
                                </li>
                            </div>
                        )
                    )}
                </ul>
            </div>
            <div className="col-md-6">
                {listTasks ? (
                    <div>
                        <p>Open bar to learn</p>
                        <br/>
                    </div>
                ) : (
                    <div>No task saved</div>
                )}
            </div>
        </div>
    );
};

export default TaskList;