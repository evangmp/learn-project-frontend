import CSSButton from "../../CSS/CSS-button.ts";
import React from "react";
import CookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

interface LogOutProps {
    setProfile: React.Dispatch<React.SetStateAction<boolean>>,
    setLogout: React.Dispatch<React.SetStateAction<boolean>>,
}

const LogOut = ({setProfile, setLogout}: LogOutProps) => {
    const navigate = useNavigate();

    // log out method to delete the cookie, delete the token in DB and navigate to home
    const logOut = () => {
        const idUser = CookiesConfiguration.getCookie("login");

        CookiesConfiguration.deleteCookie("login");
        CookiesConfiguration.deleteCookie(idUser);

        // delete the token in DB
        SecurityService.deleteToken(Number(idUser))
            .then((response: AxiosResponse) => {
                console.log("delete Token task home : ");
                console.log(response.data);
                setProfile(false);
                setLogout(true);
                navigate("/add");
            })
            .catch((e: Error) => {
                console.log(e);

            });
    };
    return (
        <button style={CSSButton.buttonConnectionPageSettings} className="connection-button"
                onClick={logOut}>
            <span>Log out</span>
        </button>
    )
};

export default LogOut;