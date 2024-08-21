import {Route, Routes, useNavigate} from "react-router-dom";
import React, {CSSProperties, useEffect, useState} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";
import CookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import CSSButton from "../../CSS/CSS-button.ts";
import Home from "../Home/Home.tsx";
import TasksParameters from "../Home/TasksParameters.tsx";
import AccountParameters from "../Home/AccountParameters.tsx";

const TasksHome = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false);

    const centerDiv: CSSProperties = {
        position: 'inherit',
    }

    // to put parameters in front page
    // if the tasks parameters menu is open
    const [tasksParameters, setTasksParameters] = useState<boolean>(false);

    // if the account parameters menu is open
    const [accountParameters, setAccountParameters] = useState<boolean>(false);

    // to see if the user is connected or no
    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            setLogin(true);
    }, []);

    return (
        <div>

            <div>
                <Home setTasksParameters={setTasksParameters} setAccountParameters={setAccountParameters} />
            </div>

            <div>
                {tasksParameters ? (<TasksParameters setTasksParameters={setTasksParameters}/>) : null}
                {accountParameters ? (<AccountParameters setAccountParameters={setAccountParameters}/>) : null}

                {login ? (
                    <div style={centerDiv}>
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
                    <div style={centerDiv}>
                        <h2>What is the idea ?</h2>

                        <p>
                            You've just learn some interesting stuff about maths or physics (just those discipline for the moment,
                            you don't have the choice) and you don't want to learn that again and again.
                        </p>

                        <p>
                            In that case, you come here, add task with the name of the topic about what you've just learn things,
                            like for example electromagnetism in physics.
                        </p>

                        <p>
                            The same day you check the task, the next day, same thing.
                            In two days, again, in a week, etc. After that, the lesson will be settle in your mind
                            and you don't need to learn this one anymore, so it's cool.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TasksHome;