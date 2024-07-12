import {routerType} from "../types/router.types.ts";
import Home from "./Home/Home.tsx";
import Connection from "./Connection/Connection.tsx";
import CreateAccount from "./CreateAccount/CreateAccount.tsx";
import TasksHome from "./Tasks/TaskHome.tsx";
import AddTask from "./Tasks/AddTask.tsx";
import Task from "./Tasks/Task.tsx";

const pagesData: routerType[] = [
    {
        path:"",
        element: <Home/>,
        title: "home"
    },
    {
        path: "connection",
        element: <Connection />,
        title: "connectionPage"
    },
    {
        path: "connection/create",
        element: <CreateAccount/>,
        title: "createAccount"
    },
    {
        path: "home",
        element: <TasksHome/>,
        title:"task home",
    },
    {
        path: "home/:iduser/:idtask",
        element: <Task/>,
        title: "task parameters, updated, etc"
    },
    {
        path: "home",
        element: <Task/>,
        title: "for home",
    },
    {
        path: "home/add",
        element: <AddTask/>,
        title: "add task",
    },
];

export default pagesData;