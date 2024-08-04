import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import React, {CSSProperties, useEffect} from "react";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import CSSButton from "../CSS/CSS-button.ts";

const TasksHome = () => {
    const { idUser}= useParams();

    const navigate = useNavigate();

    useEffect(() => { // voir comment ça fonctionne
        if(!CookiesConfiguration.getCookie("login"))
            navigate("/error");
    }, [idUser, navigate]);

    // CSS properties
    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };

    const navigationButton = (link: string) => {
        navigate(link);
    };

    // log out method to delete the cookie, delete the token in DB and navigate to home
    const logOut = () => {
        CookiesConfiguration.deleteCookie("login");
        CookiesConfiguration.deleteCookie(idUser);

        // delete the token in DB
        SecurityService.deleteToken(Number(idUser))
            .then((response: AxiosResponse) => {
                console.log("delete Token task home : ");
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);

            });
        navigationButton("/");
    }

    return (
        <div>
            <nav className="navbar-main" style={buttonDiv}>
                <button
                    style={CSSButton.buttonMainPageSettings}
                    className="choice-button"
                    onClick={logOut}
                >
                    Log out
                </button>
                <button style={CSSButton.buttonMainPageSettings}
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