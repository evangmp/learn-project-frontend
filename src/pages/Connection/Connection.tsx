import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import IAccountData from "../../types/Account.ts";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import CookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import CSSInput from "../../CSS/CSS-input.ts";
import CSSButton from "../../CSS/CSS-button.ts";

const Connection = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            navigate("/");
    }, [navigate]);

    const [message, setMessage] = useState<string>("");

    // initialize the body to create the username/password variables
    const initialAccountState: IAccountData = {
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

    // post method to sign in a user and set token in DB
    const signInUser = () => {
        if (account.password === "" || account.username === "") {
            console.error("password or username empty");
            return;
        }
        const data = {
            username: account.username,
            password: account.password,
        };
        SecurityService.signIn(data)
            .then((response: AxiosResponse) => {
                setAccount({
                    username: response.data.username,
                    password: response.data.password,
                    email: account.email,
                    role: account.role,
                });
                console.log(response.data);

                // set log in cookie
                CookiesConfiguration.setCookie("login", response.data.id, 7);
                CookiesConfiguration.setCookie(response.data.id, response.data.accessToken, 7);

                // navigate to home user
                navigate("/");

            })
            .catch((e: AxiosResponse) => {
                console.log(e);
                setMessage("Error, please retry");

            });
        }

    return(
        <div>
            <div>
                Connection Part
            </div>

            <div>
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={() => navigate("/connection/create")}>
                    <span>Create an account</span>
                </button>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="username">Enter username : </label>
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
                    <label htmlFor="password">Enter password : </label>
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

            <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={() => navigate("/")}>
                <span>Cancel</span>
            </button>

            <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={signInUser}>
                submit
            </button>
        </div>
    );
};

export default Connection;