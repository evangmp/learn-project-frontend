import homePagesData from "./HomePagesData.tsx";
import {routerType} from "../types/router.types.ts";
import {Route, Routes} from "react-router-dom";

const HomeRouter = () => {
    const pageRoutes = homePagesData.map(({path, title, element}: routerType) => {
            return <Route key={title} path={`/${path}`} element={element}/>;
        });
    return <Routes>{pageRoutes}</Routes>;
};

export default HomeRouter;