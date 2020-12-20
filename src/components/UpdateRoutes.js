import React from "react"
import { Route } from "react-router-dom"
import UpdateForm from "./updates/UpdateForm"
import UpdateList from "./updates/UpdateList"
import UpdateProviders from "./providers/UpdateProviders"

const UpdateRoutes = () => {

    return (
        <UpdateProviders>
            <Route path="/updates/new" render={() => <UpdateForm />} />
            <Route path="/updates/edit/:updateId(\d+)" render={() => <UpdateForm />} />
            <Route exact path="/updates" render={() => <UpdateList />} />
        </UpdateProviders>
    )
}

export default UpdateRoutes