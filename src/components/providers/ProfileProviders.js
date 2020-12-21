import React from "react"
import { ProfileProvider } from "../profiles/ProfileProvider"

const ProfileProviders = (props) => {
    return (
        <ProfileProvider>
            {props.children}
        </ProfileProvider>
    )
}

export default ProfileProviders