import React from "react"
import { Route, Redirect } from "react-router-dom"
import AppViews  from "./AppViews"
import Login  from "./auth/Login"
import Register  from "./auth/Register"

const WhereItHurts = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("hurts_token")) {
                return <>
                    <Route render={props => <AppViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
    </>
)

export default WhereItHurts