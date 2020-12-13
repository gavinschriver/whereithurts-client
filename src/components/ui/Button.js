import React from "react"
import "./Ui.css"

const Button = (props) => {
    return (
        <button className="button" {...props}>
            {props.children}
        </button>
    )
}

export default Button