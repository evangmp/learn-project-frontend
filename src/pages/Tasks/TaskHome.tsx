import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import CSSButton from "../CSS/CSS-button.ts";


const TasksHome = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false);

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            setLogin(true)
    }, [navigate]);

    return (
        <div>
            {login ? (
                <div>
                    <nav>
                        <button style={CSSButton.buttonMainPageSettings}
                                className="choice-button"
                                onClick={() => navigate("/add")}
                        >
                            Add
                        </button>
                    </nav>

                    <Routes>
                        <Route path="/" element={<TasksList/>}/>
                        <Route path="/:idTask" element={<Task/>}/>
                    </Routes>
                </div>
            ) : (
                <div>
                    not connected
                </div>
            )}

        </div>
    );
};

export default TasksHome;