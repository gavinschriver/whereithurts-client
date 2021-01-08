import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import FourOhFourPage from "./auth/404Page";
import HealingRoutes from "./HealingRoutes";
import HomePage from "./homepage/Homepage";
import HurtRoutes from "./HurtRoutes";
import { NavBar } from "./nav/NavBar";
import ProfileRoutes from "./ProfileRoutes";
import TreatmentRoutes from "./TreatmentRoutes";
import UpdateRoutes from "./UpdateRoutes";

const AppViews = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/healings">
          <HealingRoutes />
        </Route>

        <Route path="/treatments">
          <TreatmentRoutes />
        </Route>

        <Route path="/hurts">
          <HurtRoutes />
        </Route>

        <Route path="/updates">
          <UpdateRoutes />
        </Route>

        <Route path="/snapshot">
          <ProfileRoutes />
        </Route>

        <Route path="/">
          <FourOhFourPage />
        </Route>
      </Switch>
    </>
  );
};

export default AppViews;
