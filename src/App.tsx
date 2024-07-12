import React, {CSSProperties} from 'react';
import './App.css';
import Router from "./pages/Router.tsx";

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

    return (
        <div style={mainDiv}>
            <Router />
        </div>
    );
};

export default App;