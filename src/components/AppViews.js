import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import HealingRoutes from "./HealingRoutes";
import HomePage from "./homepage/Homepage";

const AppViews = () => {

  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
      
      <HealingRoutes/>
    </>
  );
};

export default AppViews;
