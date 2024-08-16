import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";
import CookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import CSSButton from "../../CSS/CSS-button.ts";

const TasksHome = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false);

    // to see if the user is connected or no
    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            setLogin(true);
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
                        and you don't need to learn this one anymore, so its cool.
                    </p>
                </div>
            )}

        </div>
    );
};

export default TasksHome;