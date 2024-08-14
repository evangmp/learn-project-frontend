import React, {ChangeEvent, useEffect, useState} from "react";
import IAccountData from "../../types/Account.ts";
import {useNavigate} from "react-router-dom";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import Method from "../../services/Method.ts";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import CSSInput from "../CSS/CSS-input.ts";
import CSSButton from "../CSS/CSS-button.ts";

const CreateAccount = () => {
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            navigate("/");
    }, [navigate]);

    // initialize the body to create the username/password variables
    const initialAccountState = {
        username: "",
        password: "",
        email: "",
        role: ["mod", "user"],
    };

    const [account, setAccount] = useState<IAccountData>(initialAccountState);

    // event active when something is type in username/password input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
    };

    const saveAccount = () => {
        if (account.password === "" || account.username === "" || account.email === "") {
            console.error("e");
            return;
        }

        const data ={
            username: account.username,
            password: account.password,
            email: account.email,
            role: account.role,
        };
        console.log(data);

        SecurityService.signUp(data)
            .then((response: AxiosResponse) => {
                setAccount({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    role: response.data.role,
                });
                console.log(response.data);
                //setMessage("working");
                Method.AccountInitialisation(response.data);
                navigate("/connection");
            })
            .catch((e: AxiosResponse) => {
                setMessage("probleme"); // e.response.data.message
                console.log(e);
                return;
            });
    };

    return (
        <div>
            <div>
                Create an account :
                <button onClick={() => navigate("/connection")} style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                    <span>Already an account</span>
                </button>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="username">Enter a username : </label>
                    <input
                        style={CSSInput.inputGeneralSettings}
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={account.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="email">Enter an e-mail address : </label>
                    <input
                        style={CSSInput.inputGeneralSettings}
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={account.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="password">Enter a password : </label>
                    <input
                        style={CSSInput.inputGeneralSettings}
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={account.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>
            </div>
            <div>
                <p>{message}</p>
            </div>

            <div>
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={() => navigate("/")}>
                    <span>Return home</span>
                </button>
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={saveAccount}>
                    submit
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;