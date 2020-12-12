import React from "react"
import { Route, Redirect } from "react-router-dom"
import AppViews  from "./AppViews"
import Login  from "./auth/Login"
import Register  from "./auth/Register"

const WhereItHurts = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("patient_token")) {
                return <>
                    <Route render={props => <AppViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </>
)

export default WhereItHurts