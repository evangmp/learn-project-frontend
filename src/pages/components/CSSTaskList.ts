import {CSSProperties} from "react";

const tasksListTitle: CSSProperties = {
    font: '3.5rem "Fira Sans", sans-serif', // "small-caps bold 24px/1 sans-serif",
};
const listGeneralSettings: CSSProperties = {
    listStyleType: "none",
};
const divTaskSetting: CSSProperties = {
    WebkitFontSmoothing: "antialiasing",
    boxSizing: "border-box",
    clear: "left",
    display: "block",
    fontFamily: "Arial, sans-serif",
    fontSize: "1.6rem",
    fontWeight: 400,
    lineHeight: 1.25,
    minHeight: "44px",
    paddingLeft: "40px",
    position: "relative",
    flex: "0 0 100%",
};

const CSSInput: CSSProperties = {
    display: "none",
};

const CSSTaskList = {
    CSSInput,
    divTaskSetting,
    listGeneralSettings,
    tasksListTitle
};

export default CSSTaskList;