import React from "react"
import "./Layouts.css"

export const AuthPage = (props) => {
    return (
        <div className="authpage">
            {props.children}
        </div>
    )
}

export default AuthPage