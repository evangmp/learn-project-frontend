import CSSConstants from "../components/CSSConstants.ts";
import {Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import React, {CSSProperties, useEffect, useState} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";

const TasksHome = () => {
    const { idUser}= useParams();

    const navigate = useNavigate();

    useEffect(() => { // voir comment ça fonctionne
    }, [idUser]);

    // CSS properties
    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };

    const navigationButton = (link: string) => {
        navigate(link);
    };

    return (
        <div>
            <nav className="navbar-main" style={buttonDiv}>
                <button
                    style={CSSConstants.buttonMainPageSettings}
                    className="choice-button"
                    onClick={() => navigationButton("/")}
                >
                    Log out
                </button>
                <button style={CSSConstants.buttonMainPageSettings}
                        className="choice-button"
                        onClick={() => navigationButton("/home/" + idUser + "/add")}
                >
                    Add
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