import React from "react"
import "./Layouts.css"

const BasicPage = props => {
    return (
        <div className="basicpage">
            {props.children}
        </div>
    )
}

export default BasicPage