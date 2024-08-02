import React, {ChangeEvent, useEffect, useState} from "react";
import CSSConstants from "../components/CSSConstants.ts"
import IAccountData from "../../types/Account.ts";
import {Link, useNavigate} from "react-router-dom";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import Method from "../../services/Method.ts";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import cookiesConfiguration from "../Cookies/CookiesConfiguration.ts";

const CreateAccount = () => {
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            navigate("/home/" + cookiesConfiguration.getCookie("login"));
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
                setMessage("working");
                Method.AccountInitialisation(response.data);
            })
            .catch((e: Error) => {
                setMessage("problem with the creation");
                console.log(e);
                return;
            });
        navigate("/");
    };

    return (
        <div>
            <div>
                Create an account :
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="username">Enter a username : </label>
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
                    <label htmlFor="email">Enter an e-mail address : </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
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

            <div>
                <button>
                    <Link to={"/connection"}>
                        Already an account
                    </Link>
                </button>
                <button>
                    <Link to={"/"}>
                        Return home
                    </Link>
                </button>
                <button onClick={saveAccount}>
                    submit
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;