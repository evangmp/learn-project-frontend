import {routerType} from "../types/router.types.ts";
import TopPart from "./Home/TopPart.tsx";

const HomePagesData: routerType[] = [
    {
        path:"",
        element: <TopPart/>,
        title: "test",
    },
];

export default HomePagesData;