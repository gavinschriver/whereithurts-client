import React from "react"
import { Route } from "react-router-dom"
import UpdateForm from "./updates/UpdateForm"
import UpdateList from "./updates/UpdateList"
import UpdateProviders from "./providers/UpdateProviders"
import UpdateDetail from "./updates/UpdateDetail"

const UpdateRoutes = () => {

    return (
        <UpdateProviders>
            <Route path="/updates/new" render={() => <UpdateForm />} />
            <Route path="/updates/edit/:updateId(\d+)" render={() => <UpdateForm />} />
            <Route exact path="/updates" render={() => <UpdateList />} />
            <Route path="/updates/:updateId(\d+)" render={() => <UpdateDetail />}/>
        </UpdateProviders>
    )
}

export default UpdateRoutes