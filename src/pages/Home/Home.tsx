import React, {CSSProperties, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CookiesConfiguration from "../../Cookies/CookiesConfiguration.ts";
import CSSButton from "../../CSS/CSS-button.ts";
import ProfileMenuBar from "./ProfileMenuBar.tsx";
import LogOut from "./LogOut.tsx";
import CSSImg from "../../CSS/CSS-img.ts";

interface HomeProps {
    setTasksParameters:  React.Dispatch<React.SetStateAction<boolean>>,
    setAccountParameters:  React.Dispatch<React.SetStateAction<boolean>>
}

const Home = ({setTasksParameters, setAccountParameters}: HomeProps) => {
    const navigate = useNavigate();

    // if the user is connected
    const [profile, setProfile] = useState<boolean>(false);

    // if the user is log out or no
    const [logout, setLogout] = useState<boolean>(false);

    // if the menu of parameters is open or not
    const [profileBar, setProfileBar] = useState<boolean>(false);

    // see if there is already a cookie or if the user is connected
    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            setProfile(true);
        if(logout)
            setLogout(false);
            return;

    }, [navigate, logout]);

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

    const buttonsContainerStyle: CSSProperties = {
        display: 'flex',
        gap: '15px', // Space between buttons
        height: '6rem',
    };

    return (
        <div style={homeStyle}>
            <p style={{color: "black"}}>[un nom plutôt stylé]</p>
            {profile ? (
                <div style={homeStyle}>
                    <div style={buttonsContainerStyle}>
                        <div>
                            {profileBar ? (<ProfileMenuBar id={56}
                                                           setProfile={setProfile}
                                                           setLogout={setLogout}
                                                           setAccountParameters={setAccountParameters}
                                                           setTasksParameters={setTasksParameters}/>) : (
                                <div style={buttonsContainerStyle}>
                                    <p>id : {CookiesConfiguration.getCookie("login")}</p>
                                    <LogOut setProfile={setProfile} setLogout={setLogout}/>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setProfileBar(!profileBar)}>
                            <img src={"src/assets/Default_pfp.svg.png"} alt={"default profile"}
                                 style={CSSImg.forProfileButton}/>
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