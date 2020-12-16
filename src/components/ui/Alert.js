import React from "react"

const Alert = (props) => {
    return (
        <div className="alert">
            {props.children}
        </div>
    )
}

export default Alert