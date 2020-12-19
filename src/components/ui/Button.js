import React from "react"
import "./Ui.css"

const Button = ({ className = '', onClick, ...props }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {props.children}
        </button>
    )
}

export default Button