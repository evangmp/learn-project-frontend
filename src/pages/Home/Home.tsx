import React, {CSSProperties, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import CookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import cookiesConfiguration from "../Cookies/CookiesConfiguration.ts";
import CSSButton from "../CSS/CSS-button.ts";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(CookiesConfiguration.getCookie("login"))
            navigate("/home/" + cookiesConfiguration.getCookie("login"));
    }, [navigate]);

    // CSS properties
    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };

    return (
        <div>
            <div style={buttonDiv}>
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                    with Google
                </button>
                <div style={buttonDiv}>
                    <button style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                        <Link to={"/connection"}>
                            log in
                        </Link>
                    </button>
                </div>

                <div style={buttonDiv}>
                    <button style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                        <Link to={"/connection/create"}>

                            create an account
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;