import CSSConstants from "../components/CSSConstants.ts";
import {Link, Route, Routes, useParams} from "react-router-dom";
import React, {CSSProperties, useEffect, useState} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";

const TasksHome = () => {
    const { idUser}= useParams();

    useEffect(() => { // voir comment ça fonctionne
    }, [idUser]);

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
                    <Link to={"/home/" + idUser + "/add"} className="nav-link-add">
                        Add
                    </Link>
                </button>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<TasksList/>}/>
                    <Route path="/:idUser/:idTask" element={<Task/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default TasksHome;