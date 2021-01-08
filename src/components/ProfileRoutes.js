import React from "react";
import { Route, Switch } from "react-router-dom";
import FourOhFourPage from "./auth/404Page";
import Snapshot from "./profiles/Snapshot";
import ProfileProviders from "./providers/ProfileProviders";

const ProfileRoutes = () => {
  return (
    <ProfileProviders>
      <Switch>
        <Route exact path="/snapshot" render={() => <Snapshot />} />
        <Route path="/snapshot">
          <FourOhFourPage />
        </Route>
      </Switch>
    </ProfileProviders>
  );
};

export default ProfileRoutes;
