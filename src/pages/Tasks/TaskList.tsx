import React, {CSSProperties, useEffect, useState} from "react";
import {Task} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import CSSConstants from "../components/CSSConstants.ts";
import {AxiosResponse} from "axios";
import DateFunction from "../Date/DateFunctions.tsx";
import {Link} from "react-router-dom";

const TaskList = () => {
    // i will see, error in console, because each child of the list don't have a unique key, so it'll be useful
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    // to set date and send it to the DateAlgo
    const [date, setDate] = useState<Date>(new Date());

    const [inputId, setInputId] = useState<number>(null);

    const [listTasks, setListTasks] = useState<Array<Task>>(null);

    // when its run call the const to have all the tasks and setDate (if not date is null)
    useEffect(() => {
        setDate(new Date());
    }, []);


    // get method to bring all the tasks from the DB
    const getTask = () => {
        TaskDataService.getUserData(inputId)
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
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // useful to set if the task needs to be print, with DateAlgo
    const hiddenOrNo = (task: Task) => {
        // will call another const, this one will compare the date of the task and the actual date,
        // to render if the task will be print or no with a boolean
        const printOrNo = DateFunction.DateIdea(task, date);
        console.log("Task : " + task.taskName + ", is good or no : " + printOrNo);
        return printOrNo;
    };

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
                <div>
                    <label htmlFor="id_choice">
                        enter an id :
                    </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
                        type="number"
                        id="id_choice"
                        onChange={(event) => {
                            setInputId(Number(event.target.value));
                        }}
                    />
                    <button onClick={() => {
                        getTask();
                        console.log("id : " + inputId);
                    }}>
                        ok
                    </button>
                </div>

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
                                        {task.taskName}
                                    </div>

                                    <div style={divTaskSetting}>
                                        {task.taskDiscipline}
                                    </div>

                                    <div style={divTaskSetting}>
                                        {task.taskDate}
                                    </div>

                                    <div style={divTaskSetting}>
                                        <button /*style={CSSConstants.buttonMainPageSettings}*/>
                                            <Link
                                                to={"/home/" + inputId + "/" + task.id}
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