import React, {CSSProperties} from 'react';
import './App.css';
import Router from "./pages/Router.tsx";
import HomeRouter from "./pages/HomeRouter.tsx";

const App: React.FC = () => {

    // CSS properties
    const testMain: CSSProperties = {
        backgroundColor: "#f3e5a0",
        boxSizing: "inherit",
        width:"100%",
        height: "100%",
        //top:"20rem",
        //bottom:"10rem",
    };

    return (
        <div className= "first-div" style={testMain}>
            <div>
                <HomeRouter/>
            </div>
            <Router />

        </div>
    );
};

export default App;