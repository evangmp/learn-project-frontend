import {CSSProperties} from "react";
import CSSButton from "../CSS/CSS-button.ts";

const TopPart = () => {

    const style: CSSProperties = {
        backgroundColor: "#e8d783"/*"#7f7b73"*/,
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

    return(
        <div style={style}>
            <p style={{color:"black"}}>OptLearn</p>

            <div style={buttonsContainerStyle} >
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                    Log in
                </button>
                <button style={CSSButton.buttonConnectionPageSettings} className="connection-button">
                    Sign in
                </button>
            </div>
        </div>
    )
};

export default TopPart;