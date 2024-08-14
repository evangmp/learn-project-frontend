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

const buttonTest: CSSProperties = {
    appearance: "none",
    backgroundColor: "transparent",
    border: "2px solid #1A1A1A",
    borderRadius: "15px",
    boxSizing: "border-box",
    color: "#3B3B3B",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: 'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "normal",
    margin: "0",
    minHeight: "30px",
    minWidth: "0",
    outline: "none",
    padding: "4px 6px",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 300ms cubic-bezier(.23, 1, 0.32, 1)",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    width: "30%",
    willChange: "transform",
};

const CSSButton = {
    buttonGeneralSettings,
    buttonConnectionPageSettings,
    buttonMainPageSettings,
    buttonTest,
};

export default CSSButton;