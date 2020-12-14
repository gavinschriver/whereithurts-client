import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import HomePage from "./homepage/Homepage";
import { PatientContext } from "./patients/PatientProvider";

const AppViews = () => {

  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
    </>
  );
};

export default AppViews;
