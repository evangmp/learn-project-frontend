import React, {useEffect, useState} from "react";
import {ListTask, Tasks} from "../../types/Task.ts";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import SetAchievement from "../../Date/SetAchievement.ts";
import Filters from "../Filters/Filters.tsx";
import ListSort from "../Filters/ListSort.ts";
import CSSTitle from "../../CSS/CSS-title.ts";
import CSSList from "../../CSS/CSS-list.ts";
import CSSInput from "../../CSS/CSS-input.ts";
import CSSDiv from "../../CSS/CSS-div.ts";
import CSSButton from "../../CSS/CSS-button.ts";
import cookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import TaskService from "../../services/TaskService.ts";

const TaskList = () => {
    const idUser: string | null = cookiesConfiguration.getCookie("login");
    const navigate = useNavigate();

    // to refresh the list when a task is deleted
    const [refreshList, setRefreshList] = useState<boolean>(false);

    // to map and print tasks
    const [listTasks, setListTasks] = useState<Array<ListTask>>([]);
    const [listAllTheTasks, setListAllTheTasks] = useState<Array<ListTask>>([]);

    // filter buttons setting
    const [timeFilter, setTimeFilter] = useState<string>("All");
    const [disciplineFilter, setDisciplineFilter] = useState<string>("None");

    // to get all the tasks and see if the list needs to be refreshed (because updated)
    useEffect(() => {
        if(idUser)
            getTask(Number(idUser));
        if(refreshList)
            setRefreshList(false);
            setTimeFilter("All");
            setDisciplineFilter("None");
            return;
    }, [idUser, refreshList]);

    // get method to bring all the tasks from the DB
    const getTask = (idUser: number) => { // idUser "bonjour"
        TaskService.getUserData(idUser)
            .then((response: AxiosResponse) => {
                if(response.data == "") {
                    setListTasks([]);
                    return;
                }

                let i: number = 0;
                const initializationTaskList: Array<ListTask> = [];
                while (response.data.taskName[i] !== undefined) {
                    initializationTaskList.push({
                        id: idUser,
                        index: i,
                        taskName: response.data.taskName[i],
                        taskDiscipline: response.data.taskDiscipline[i],
                        taskAchievement: response.data.taskAchievement[i],
                        taskDate: response.data.taskDate[i],
                    });
                    i++;
                }

                setListAllTheTasks(initializationTaskList);
                setListTasks(ListSort.allTheTasksToShow(initializationTaskList));
            })
            .catch((e: Error) => {
                console.log("Error in TaskList GetUserData method : ");
                console.log(e.message);
            });
    };

    // set default checked or no for each tasks
    const defaultChecked = (taskDate: string, taskAchievement: number[]) => {
        return SetAchievement.SetDefaultChecked(taskDate, taskAchievement);
    };

    const serviceTaskList = (taskToSend: Tasks | null, method: string) => {
        TaskService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                if(method == "delete") {
                    setRefreshList(true);
                    navigate("/");
                }
            })
            .catch((e: Error) => {
                console.log("Error in TaskList updateTask : ");
                console.log(e);
            });
    };

    const deleteTask = (task: ListTask) => {
        const listToSend: Tasks | null = ListSort.deleteTask(listAllTheTasks, task.index, Number(idUser), setListTasks, setListAllTheTasks)
        serviceTaskList(listToSend, "delete");
    };

    const updateTask = (task: ListTask) => {
        const listToSend: Tasks | null = ListSort.updateTask(listAllTheTasks, listTasks, task, setListTasks, setListAllTheTasks);
        serviceTaskList(listToSend, "");
    };

    const updateFilter = (typeFilter: string) => {
        setTimeFilter(typeFilter);

        const sortedList: ListTask[] = ListSort.disciplineTask(listAllTheTasks, setListTasks, disciplineFilter, typeFilter);
        setListTasks(sortedList);
    };

    const disciplineUpdateFilter = (discipline: string) => {
        ListSort.disciplineTask(listAllTheTasks, setListTasks, discipline, timeFilter);
    };

    const AllFilter: JSX.Element = Filters.defaultFilter(timeFilter, "All", setTimeFilter, updateFilter);
    const ActiveFilter: JSX.Element = Filters.defaultFilter(timeFilter, "Active", setTimeFilter, updateFilter);
    const CompletedFilter: JSX.Element = Filters.defaultFilter(timeFilter, "Completed", setTimeFilter, updateFilter);

    const NoneDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "None", setDisciplineFilter, disciplineUpdateFilter);
    const MathematicsDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "mathematics", setDisciplineFilter, disciplineUpdateFilter);
    const PhysicsDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "physics", setDisciplineFilter, disciplineUpdateFilter);

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4 style={CSSTitle.tasksListTitle}>Tasks List</h4>

                <h5>Filters</h5>

                <div>
                    {AllFilter}
                    {ActiveFilter}
                    {CompletedFilter}
                </div>

                <div>
                    {NoneDisciplineFilter}
                    {MathematicsDisciplineFilter}
                    {PhysicsDisciplineFilter}
                </div>

                <ul className="list-group">
                    {listTasks && listTasks.map((task: ListTask) => (
                            <div style={{padding: '2rem'}}>

                                <li style={CSSList.listGeneralSettings}
                                    className={"list-group-item " + task.taskDate}
                                    key={task.taskDate}
                                >
                                    <div className="checkbox-wrapper-15">
                                        <input className="inp-cbx" id={"cbx-15" + task.taskDate} type="checkbox" style={CSSInput.inputList}
                                               defaultChecked={defaultChecked(task.taskDate, task.taskAchievement)}
                                               onChange={() => {
                                                   updateTask(task);
                                                   //task.taskAchievement = achievementUpdate(task);
                                               }}
                                        />
                                        <label className="cbx" htmlFor={"cbx-15" + task.taskDate}>
                                            <div>
                                                <span>
                                                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                    <polyline points="1 5 4 8 11 1"></polyline>
                                                    </svg>
                                                    </span>
                                                <span>{task.taskName}</span>
                                            </div>
                                            <div>
                                                <span style={CSSInput.inputList}>
                                                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                    </svg>
                                                </span>
                                                <span>Discipline : {task.taskDiscipline}</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div style={CSSDiv.divTaskSetting}>
                                        <button className="button-28"
                                                onClick={() => navigate("/" + task.index)}
                                                style={CSSButton.buttonTest}
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => deleteTask(task)}
                                                className="button-28"
                                                style={CSSButton.buttonTest}
                                        >
                                                Delete
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
                        <p>you know what you have to do</p>
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