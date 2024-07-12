import {CSSProperties} from "react";

const buttonGeneralSettings: CSSProperties = {
    appearance: "none",
    background: "transparent",
    border: "solid",
    color: "inherit", /*form body*/
    font: "inherit",
    lineHeight: "normal",
    margin: 0,
    overflow: "visible",
    padding: 0,
    width: "auto",
};

const inputGeneralSettings: CSSProperties = {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: 1.15,
    margin: 0,
    overflow: "visible",
};

const buttonConnectionPageSettings: CSSProperties= {
    backgroundColor: "#fbeee0",
    border: "2px solid #422800",
    borderRadius: "30px",
    boxShadow: "#422800 4px 4px 0 0",
    color: "#422800",
    cursor: "pointer",
    display: "inline-block",
    fontWeight: 600,
    fontSize: "18px",
    padding: "0 18px",
    lineHeight: "50px",
    textAlign: "center",
    textDecoration: "none",
    userSelect: "none",
    touchAction: "manipulation",
    WebkitUserSelect:"none",
};

const buttonMainPageSettings: CSSProperties = {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "#fbeee0",
    borderRadius: "4px",
    borderWidth: 0,
    boxShadow: "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset",
    boxSizing: "border-box",
    color: "#36395A",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: '"JetBrains Mono",monospace',
    height: "48px",
    justifyContent: "center",
    lineHeight: 1,
    listStyle: "none",
    overflow: "hidden",
    paddingLeft: "16px",
    paddingRight: "16px",
    position: "relative",
    textAlign: "left",
    textDecoration: "none",
    transition: "box-shadow .15s,transform .15s",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    whiteSpace: "nowrap",
    willChange: "box-shadow,transform",
    fontSize: "18px",

    padding: '3rem',
    margin: "4px",
};



const CSSConstants = {
    buttonGeneralSettings,
    inputGeneralSettings,
    buttonConnectionPageSettings,
    buttonMainPageSettings,
};

export default CSSConstants;