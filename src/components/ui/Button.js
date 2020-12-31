import React from "react"
import "./Ui.css"

const Button = ({ className = '', onClick, children, disabled }) => {
    return (
        <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button