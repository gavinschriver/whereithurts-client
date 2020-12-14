import React from "react"
import { NavBar } from "../nav/NavBar"
import "./Layouts.css"

const BasicPage = props => {
    return (
        <div className="basicpage">
            <NavBar/>
            {props.children}
        </div>
    )
}

export default BasicPage