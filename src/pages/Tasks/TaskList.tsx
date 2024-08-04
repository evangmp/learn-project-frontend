import React, {useEffect, useState} from "react";
import {ListTask, Task} from "../../types/Task.ts";
import TaskDataService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import {useNavigate, useParams} from "react-router-dom";
import SetAchievement from "../Date/SetAchievement.ts";
import CSSConstants from "../components/CSSConstants.ts";
import Filters from "../Filters/Filters.tsx";
import ListSort from "../Filters/ListSort.ts";
import CSSTaskList from "../components/CSSTaskList.ts";

const TaskList = () => {
    const { idUser}= useParams();
    const navigate = useNavigate();

    // to refresh the list when a task is deleted
    const [refreshList, setRefreshList] = useState<boolean>(false);

    // form ready to be sent to DB
    const [allTheTasks, setAllTheTasks] = useState<ListTask>(null);

    // to map and print tasks
    const [listTasks, setListTasks] = useState<Array<Task>>(null);
    const [listAllTheTasks, setListAllTheTasks] = useState<Array<Task>>(null);

    // filter button setting
    const [timeFilter, setTimeFilter] = useState<string>("All");
    const [disciplineFilter, setDisciplineFilter] = useState<string>("None");

    // when its run call the const to have all the tasks and setDate (if not date is null)
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
        TaskDataService.getUserData(idUser)
            .then((response: AxiosResponse) => {
                console.log(response);
                if(response.data.taskName[0] == undefined) {
                    setListTasks(null);
                    return;
                }

                let i: number = 0;
                const initializationTaskList: Array<Task> = [];
                while (response.data.taskName[i] !== undefined) {
                    initializationTaskList.push({
                        id: idUser,
                        taskName: response.data.taskName[i],
                        taskDiscipline: response.data.taskDiscipline[i],
                        taskAchievement: response.data.taskAchievement[i],
                        taskDate: response.data.taskDate[i],
                    });
                    i++;
                }

                setListAllTheTasks(initializationTaskList);
                setListTasks(ListSort.allTheTasksToShow(initializationTaskList));

                setAllTheTasks({
                    id: idUser,
                    taskName: response.data.taskName,
                    taskDiscipline: response.data.taskDiscipline,
                    taskAchievement: response.data.taskAchievement,
                    taskDate: response.data.taskDate,
                });
            })
            .catch((e: Error) => {
                console.log(e.message);
                console.log(e.stack);
            });
    };

    // set default checked or no
    const defaultChecked = (taskDate: string, taskAchievement: number[]) => {
        return SetAchievement.SetDefaultChecked(taskDate, taskAchievement);
    };

    const serviceTaskList = (taskToSend: ListTask, method: string) => {
        TaskDataService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.debug(response.data.taskAchievement);
                if(method == "delete") {
                    setRefreshList(true);
                    navigate("/home/" + idUser);
                }
            })
            .catch((e: Error) => {
                console.log("erreur");
                console.log(e);
            });
    }

    const deleteTask = (task: Task) => {
        serviceTaskList(ListSort.deleteTask(listAllTheTasks, task.taskName, task.taskDate, Number(idUser), setAllTheTasks, setListTasks, setListAllTheTasks), "delete");
    };

    const updateTask = (task: Task) => {
        ListSort.updateTask(listAllTheTasks, listTasks, task, setAllTheTasks, setListTasks, setListAllTheTasks);
        serviceTaskList(allTheTasks, "");
    };

    const updateFilter = (typeFilter: string) => {
        setTimeFilter(typeFilter);

        const sortedList: Task[] = ListSort.timeTask(listAllTheTasks, setListTasks, disciplineFilter, typeFilter);
        setListTasks(sortedList);
    };

    const disciplineUpdateFilter = (discipline: string) => {
        ListSort.disciplineTask(listAllTheTasks, setListTasks, discipline, timeFilter);
        //console.log(listTasks);
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
                <h4 style={CSSTaskList.tasksListTitle}>Tasks List</h4>

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
                    {listTasks && listTasks.map((task: Task, index: number) => (
                            <div style={{padding: '2rem'}}>

                                <li style={CSSTaskList.listGeneralSettings}
                                    className={"list-group-item " + task.taskDate}
                                    key={task.taskDate}
                                >
                                    <div className="checkbox-wrapper-15">
                                        <input className="inp-cbx" id={"cbx-15" + task.taskDate} type="checkbox" style={CSSTaskList.CSSInput}
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
                                                <span style={CSSTaskList.CSSInput}>
                                                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                    </svg>
                                                </span>
                                                <span>Discipline : {task.taskDiscipline}</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div style={CSSTaskList.divTaskSetting}>
                                        <button className="button-28"
                                                onClick={() => navigate("/home/" + idUser + "/" + index)}
                                                style={CSSConstants.buttonTest}
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => deleteTask(task)}
                                                className="button-28"
                                                style={CSSConstants.buttonTest}
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