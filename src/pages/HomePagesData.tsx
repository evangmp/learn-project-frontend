import {routerType} from "../types/router.types.ts";
import Home from "./Home/Home.tsx";

const HomePagesData: routerType[] = [
    {
        path:"",
        element: <Home/>,
        title: "home"
    },
    {
        path: "/add",
        element: <Home/>,
        title: "add task"
    },
];

export default HomePagesData;