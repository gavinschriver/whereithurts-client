import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import HomePage from "./homepage/Homepage";
import { PatientContext } from "./patients/PatientProvider";

const AppViews = () => {
  const { patient, getPatientById } = useContext(PatientContext);

  useEffect(() => {
    getPatientById(1);
  }, []);

  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
    </>
  );
};

export default AppViews;
