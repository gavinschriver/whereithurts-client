import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { PatientContext} from "./patients/PatientProvider"

const AppViews = () => {
  const { patient, getPatientById } = useContext(PatientContext)

  useEffect(() => {
    getPatientById(1)
  }, [])

  return (
    <>
        <Route exact path='/'>
          <main>
            SUP
          </main>
          </Route>
    </>
  );
};

export default AppViews;
