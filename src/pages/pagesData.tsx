import {routerType} from "../types/router.types.ts";
import Connection from "./Connection/Connection.tsx";
import CreateAccount from "./CreateAccount/CreateAccount.tsx";
import TasksHome from "./Tasks/TaskHome.tsx";
import AddTask from "./Tasks/AddTask.tsx";
import Task from "./Tasks/Task.tsx";
import Error from "./Connection/Error.tsx";

const pagesData: routerType[] = [
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
        path: "",
        element: <TasksHome/>,
        title:"task home",
    },
    {
        path: "/:idTask",
        element: <Task/>,
        title: "task parameters, updated, etc"
    },
    {
        path: "",
        element: <Task/>,
        title: "for home",
    },
    {
        path: "/add",
        element: <AddTask/>,
        title: "add task",
    },
    {
        path: "/error",
        element: <Error/>,
        title: "error connection",
    },
];

export default pagesData;