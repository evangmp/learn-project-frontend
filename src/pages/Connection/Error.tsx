import {useNavigate} from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <p>
                    you shouldn't be here
                </p>
            </div>

            <div>
                <button onClick={() => navigate("/")}>
                    go home
                </button>
            </div>
        </div>
    )
};

export default Error;