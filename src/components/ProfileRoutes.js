import React from "react"
import { Route } from "react-router-dom"
import Snapshot from "./profiles/Snapshot"
import ProfileProviders from "./providers/ProfileProviders"

const ProfileRoutes = () => {
    return (
        <ProfileProviders>
            <Route exact path="/snapshot" render={() => <Snapshot/> } />
        </ProfileProviders>
    )
}

export default ProfileRoutes