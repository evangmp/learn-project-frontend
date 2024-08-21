import CSSButton from "../../CSS/CSS-button.ts";
import React from "react";

interface AccountParametersButtonProps {
    setAccountParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const AccountParametersButton = ({setAccountParameters}: AccountParametersButtonProps) => {

    return(
        <button style={CSSButton.buttonConnectionPageSettings}
                className="connection-button"
                onClick={() => setAccountParameters(true)}>
            Account parameters
        </button>
    )
};

export default AccountParametersButton;