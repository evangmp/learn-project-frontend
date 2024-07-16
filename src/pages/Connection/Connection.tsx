import {Link, useNavigate} from "react-router-dom";
import CSSConstants from "../components/CSSConstants.ts";
import React, {ChangeEvent, useState} from "react";
import IAccountData from "../../types/Account.ts";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";

const Connection = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>("");


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

    // post method to sign in a user
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
                console.log(response.data.id);
                setMessage("you");
                navigate("/home/" + response.data.id);

            })
            .catch((e: Error) => {
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
                <div className="form-group">
                    <label htmlFor="username">Enter username : </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
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
                        style={CSSConstants.inputGeneralSettings}
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

            <button>
                <Link to={"/"}>
                    Cancel
                </Link>
            </button>

            <button>
                <Link to={"/connection/create"}>
                    Create an account
                </Link>
            </button>
            <button onClick={signInUser}>
                submit
            </button>
        </div>
    );
};

export default Connection;