import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import HealingRoutes from "./HealingRoutes";
import HomePage from "./homepage/Homepage";
import TreatmentRoutes from "./TreatmentRoutes";

const AppViews = () => {
  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>

      <TreatmentRoutes />
      <HealingRoutes />
    </>
  );
};

export default AppViews;
