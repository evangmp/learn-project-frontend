import React, {CSSProperties} from "react";
import LogOut from "./LogOut.tsx";
import TasksParametersButton from "./TasksParametersButton.tsx";
import AccountParametersButton from "./AccountParametersButton.tsx";

interface ProfileMenuBarProps {
    id?: number,
    setProfile: React.Dispatch<React.SetStateAction<boolean>>,
    setLogout: React.Dispatch<React.SetStateAction<boolean>>,
    setTasksParameters:  React.Dispatch<React.SetStateAction<boolean>>,
    setAccountParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const ProfileMenuBar = ({
                            id,
                            setProfile,
                            setLogout,
                            setAccountParameters,
                            setTasksParameters}: ProfileMenuBarProps) => {
    const divSet: CSSProperties = {
        backgroundColor: 'black',
    };

    const buttonSet: CSSProperties = {
        display: "flex",
        flexDirection: "column",
    };

    return (
        <div style={divSet}>
            <p>Your id : {id}</p>
            <div style={buttonSet}>
                <LogOut setProfile={setProfile} setLogout={setLogout}/>
                <TasksParametersButton setTasksParameters={setTasksParameters}/>
                <AccountParametersButton setAccountParameters={setAccountParameters}/>
            </div>
        </div>
    )
};

export default ProfileMenuBar;