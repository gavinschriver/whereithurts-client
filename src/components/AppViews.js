import React from "react";
import { Route } from "react-router-dom";
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
      
      <Route exact path="/">
        <HomePage />
      </Route>

      <TreatmentRoutes />
      <HealingRoutes />
      <HurtRoutes />
      <UpdateRoutes />
      <ProfileRoutes/>

    </>
  );
};

export default AppViews;
