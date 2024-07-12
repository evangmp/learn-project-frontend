import CSSConstants from "../components/CSSConstants.ts";
import {Link, Route, Routes} from "react-router-dom";
import React, {CSSProperties} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";

const TasksHome = () => {
    // CSS properties
    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };

    return (
        <div>
            <nav className="navbar-main" style={buttonDiv}>
                <button style={CSSConstants.buttonMainPageSettings} className="choice-button">
                    <Link to={"/"} className="navbar-brand">
                        Log out
                    </Link>
                </button>
                <button style={CSSConstants.buttonMainPageSettings} className="choice-button">
                    <Link to={"/home/add"} className="nav-link-add">
                        Add
                    </Link>
                </button>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<TasksList/>}/>
                    <Route path="/:iduser/:idtask" element={<Task/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default TasksHome;