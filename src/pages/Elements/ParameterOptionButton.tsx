import React, {CSSProperties, useEffect} from "react";
import CSSImg from "../../CSS/CSS-img.ts";

interface BoxProps {
    style: 	React.CSSProperties | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParameterOptionButton = ({style, open, setOpen}: BoxProps) => {

    useEffect(() => {
        arrowStyle();
    }, []);

    const arrowStyle = (): CSSProperties => {
        if(open) {
            return {...CSSImg.forParametersArrow, transform: 'rotate(90deg)'};
        }
        else {
            return {...CSSImg.forParametersArrow, transform: 'rotate(0deg)'};
        }
    };

    return(
        <button className="parameter-option-button" style={style} onClick={() => setOpen(!open)}>
            <img src={"src/assets/60758.png"} alt={"default arrow parameters"}
                 style={arrowStyle()}/>
        </button>
    )
};

export default ParameterOptionButton;