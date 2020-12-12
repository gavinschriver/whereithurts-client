import React from "react"
import "./Layouts.css"

const AuthPage = (props) => {
    return (
        <main className="authpage">
            {props.children}
        </main>
    )
}

export default AuthPage