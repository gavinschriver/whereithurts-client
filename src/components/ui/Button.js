import React from "react"
import "./Ui.css"

const Button = ({ className = '', ...props }) => {
    return (
        <button className={`button ${className}`} {...props}>
            {props.children}
        </button>
    )
}

export default Button