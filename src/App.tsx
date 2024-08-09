import React, {CSSProperties} from 'react';
import './App.css';
import Router from "./pages/Router.tsx";
import HomeRouter from "./pages/HomeRouter.tsx";

const App: React.FC = () => {

    // CSS properties
    const mainDiv: CSSProperties = {
        backgroundColor: "#f4d8b5", //"#ffffff",
        boxShadow:
            '0 2px 4px 0 rgb(0 0 0 / 20%)',
        margin: '2rem 0 4rem 0',
        padding: '1rem',
        position: 'relative',
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "50rem",
    };

    const testMain: CSSProperties = {
        backgroundColor: "#fceb99s", //"#9e9a91",
        boxSizing: "inherit",
        width:"100%",
        height: "100%",
        //top:"20rem",
        //bottom:"10rem",
    };

    const testMain2: CSSProperties = {
        backgroundColor:"red",
    };

    const testMain3: CSSProperties = {
        backgroundColor:"blue  ",
        //width: "100rem",
        //height: "10rem",
    };

    return (
        <div className= "first-div" style={testMain}>
            <div style={testMain3}>
                <HomeRouter/>
            </div>
            <Router />
        </div>
    );
};

export default App;