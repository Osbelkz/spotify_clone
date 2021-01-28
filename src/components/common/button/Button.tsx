import React, { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: "green"
}

export const Button = React.memo(({btnType, children, ...rest}: PropsType) => {

    let buttonClasses = `${classes.button} ${classes[btnType as "green"]}`

    return (
            <button className={buttonClasses} {...rest}>
                {children}
            </button>
    )
})
