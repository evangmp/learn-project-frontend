import React, {CSSProperties, useEffect, useState} from "react";
import {AchievementTable, DateType, ListTask, Tasks} from "../../types/Task";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import Filters from "../Filters/Filters.tsx";
import ListSort from "../Filters/ListSort.ts";
import CSSTitle from "../../CSS/CSS-title.ts";
import CSSList from "../../CSS/CSS-list.ts";
import CSSInput from "../../CSS/CSS-input.ts";
import CSSDiv from "../../CSS/CSS-div.ts";
import CSSButton from "../../CSS/CSS-button.ts";
import cookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import TaskService from "../../services/TaskService.ts";
import DateTypeCalculation from "../../Date/DateTypeCalculation.ts";
import Convert from "../../components/Convert.ts";
import TypeBase from "../../components/TypeBase.ts";
import SwitchFilters from "../Filters/SwitchFilters.ts";

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

    // initialize DateTable
    const [DateTable, setDateTable] = useState<DateType>(TypeBase.DateBase());

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

                console.log(response.data);

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

                const tableDate: DateType = DateTypeCalculation(initializationTaskList)

                setDateTable(tableDate);

                console.log("tableDate");
                console.log(tableDate);

                setListAllTheTasks(initializationTaskList);
                setListTasks(ListSort.taskToShow(tableDate, initializationTaskList));
            })
            .catch((e: Error) => {
                console.log("Error in TaskList GetUserData method : ");
                console.log(e.message);
            });
    };

    // set default checked or no for each tasks
    const defaultChecked = (taskIndex: number) => {
        return DateTable?.defaultChecked[taskIndex];
    };

    const serviceTaskList = (taskToSend: Tasks | null, method: string) => {
        TaskService.updateTask(taskToSend)
            .then((response: AxiosResponse) => {
                console.log("response.data lorsque update/delete task");
                console.log(response.data);

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
        const sortedList: Array<ListTask> = ListSort.deleteTask(listAllTheTasks, task.index, Number(idUser))

        const listToSend: Tasks | null = Convert.ListTaskToTasks(sortedList, Number(idUser));

        // don't actually really need to update setTable because the page will be relaunched
        serviceTaskList(listToSend, "delete");
    };

    const updateTask = (task: ListTask) => {
        const updateDate: DateType = DateTable;

        // bring the achievementTable of the actual task
        const taskAchievementTable : AchievementTable | undefined = updateDate?.taskAchievement[task.index];

        if(DateTable.late[task.index] && DateTable.taskAchievementIndex[task.index] < 0) {
            const dayWhereTaskAppear: number[] = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];

            for(let m = 0; m < dayWhereTaskAppear.length; m++) {
                if(DateTable.difference[task.index]-1 == dayWhereTaskAppear[m]) {
                    taskAchievementTable[m] = 1;
                }
            }
        }
        else {
            // condition if it is actually 0 or 1 (not checked or checked) and inverse 0 => 1
            if(updateDate?.taskAchievement[task.index][updateDate?.taskAchievementIndex[task.index]] === 0){
                taskAchievementTable[updateDate.taskAchievementIndex[task.index]] = 1;
            }
            else if(updateDate?.taskAchievement[task.index][updateDate?.taskAchievementIndex[task.index]] === 1) {
                taskAchievementTable[updateDate.taskAchievementIndex[task.index]] = 0;
            }
            else {console.log("ALERTE MAXIMALE C4EST PAS NORMAL")}
        }

        // replace achievementTable
        updateDate.taskAchievement[task.index] = taskAchievementTable;
        // change if it needs to be defaultChecked or not
        updateDate.defaultChecked[task.index] = !updateDate?.defaultChecked[task.index];
        setDateTable(updateDate);

        // replace in listTask by the new taskAchievement and send to the service
        const preListToSend: Array<ListTask> = listAllTheTasks;
        preListToSend[task.index].taskAchievement = updateDate?.taskAchievement[task.index];

        const listToSend: Tasks | null = Convert.ListTaskToTasks(preListToSend, Number(idUser));


        setListAllTheTasks(preListToSend);
        setListTasks(ListSort.taskToShow(updateDate, preListToSend));

        serviceTaskList(listToSend, "");
    };

    // All/completed/active filter
    const updateFilter = (typeFilter: string) => {
        setTimeFilter(typeFilter);

        const sortedList: ListTask[] = SwitchFilters.disciplineFilter(disciplineFilter, typeFilter, listAllTheTasks, DateTable);
        setListTasks(sortedList);
    };

    // discipline filter
    const disciplineUpdateFilter = (discipline: string) => {
        setDisciplineFilter(discipline);

        const sortedList: ListTask[] = SwitchFilters.disciplineFilter(discipline, timeFilter, listAllTheTasks, DateTable);
        setListTasks(sortedList);
    };

    const AllFilter: JSX.Element = Filters.defaultFilter(timeFilter, "All", setTimeFilter, updateFilter);
    const ActiveFilter: JSX.Element = Filters.defaultFilter(timeFilter, "Active", setTimeFilter, updateFilter);
    const CompletedFilter: JSX.Element = Filters.defaultFilter(timeFilter, "Completed", setTimeFilter, updateFilter);

    const NoneDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "None", setDisciplineFilter, disciplineUpdateFilter);
    const MathematicsDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "mathematics", setDisciplineFilter, disciplineUpdateFilter);
    const PhysicsDisciplineFilter: JSX.Element = Filters.defaultFilter(disciplineFilter, "physics", setDisciplineFilter, disciplineUpdateFilter);

    const divCSS: CSSProperties = {
        color: "red",
    };


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
                            <div style={{padding: '2rem'}} key={task.taskDate}>

                                <li style={CSSList.listGeneralSettings}
                                    className={"list-group-item " + task.taskDate}
                                >
                                    <div className="checkbox-wrapper-15">
                                        <input className="inp-cbx" id={"cbx-15" + task.taskDate} type="checkbox" style={CSSInput.inputList}
                                               defaultChecked={defaultChecked(task.index)}
                                               onChange={() => {updateTask(task);}}
                                        />
                                        <label className="cbx" htmlFor={"cbx-15" + task.taskDate}>
                                            <div>
                                                <span>
                                                    <svg width="12px" height="9px" viewBox="0 0 12 9" >
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
                                            {DateTable.late[task.index] ? (
                                                <div>
                                                    <p style={divCSS}>this has not been revised the previous day</p>
                                                </div>
                                                ) : null}
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