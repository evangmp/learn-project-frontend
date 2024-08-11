import React, {CSSProperties, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import CSSButton from "../CSS/CSS-button.ts";
import SecurityService from "../../services/AuthentificationService.ts";
import {AxiosResponse} from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<boolean>(false);

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            setProfile(true);

    }, [navigate]);

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
            })
            .catch((e: Error) => {
                console.log(e);

            });
        setProfile(false);
        navigate("/");
        window.location.reload();
    }

    // CSS properties
    const homeStyle: CSSProperties = {
        backgroundColor: "#e8d783",
        width: "inherit",
        height: "10rem",
        display: 'flex',
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-between', // Space items horizontally
        padding: '20px', // Optional: Add some padding for better spacing
    };

    const buttonsContainerStyle = {
        display: 'flex',
        gap: '15px', // Space between buttons
    };

    return (
        <div style={homeStyle}>
            <p style={{color: "black"}}>OptLearn</p>
            {profile ? (
                <div style={homeStyle}>
                    <p>id : {CookiesConfiguration.getCookie("login")}</p>

                    <div>
                        <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={logOut}>
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div style={buttonsContainerStyle}>
                    <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={() => navigate("/connection")}>
                        <span>Log in</span>
                    </button>
                    <button style={CSSButton.buttonConnectionPageSettings} className="connection-button" onClick={() => navigate("connection/create")}>
                        <span>Create an account</span>
                    </button>
                </div>
            )}
        </div>


)
    ;
};

export default Home;