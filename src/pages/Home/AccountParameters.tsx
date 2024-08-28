import React, {CSSProperties} from "react";

interface AccountParametersProps {
    setAccountParameters:  React.Dispatch<React.SetStateAction<boolean>>,
}

const AccountParameters = ({setAccountParameters}: AccountParametersProps) => {
    const backgroundColor:CSSProperties = {
        backgroundColor: 'grey',
        position: 'relative',
    };

    const textColor: CSSProperties = {
        color: 'white',
    };

    return(
        <div style={backgroundColor}>
            <p style={textColor}>Account Parameters</p>

            <div>
                <span>
                    Change password
                </span>
                <button>
                    button_1
                </button>

            </div>

            <div>
                <span>
                    Change email
                </span>
                <button>
                    button_2
                </button>
            </div>

            <div>
                <span>
                    Change username
                </span>
                <button>
                    button_3
                </button>
            </div>

            <div>
                <span>
                    Delete account
                </span>
                <button>
                    button_4
                </button>
            </div>

            <button onClick={() => setAccountParameters(false)}>Close</button>
        </div>
    )
};

export default AccountParameters;