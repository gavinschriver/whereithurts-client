import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppViews from "./AppViews";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { PatientProvider } from "./patients/PatientProvider";

const WhereItHurts = () => (
  <>
    <PatientProvider>
      <Route
        render={() => {
          if (localStorage.getItem("patient_token")) {
            return <Route render={(props) => <AppViews />} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route
        path="/login"
        render={() => {
          if (localStorage.getItem("patient_token")) {
            return <Redirect to="/" />;
          } else {
            return <Login />;
          }
        }}
      />

      <Route
        path="/register"
        render={() => {
          if (localStorage.getItem("patient_token")) {
            return <Redirect to="/" />;
          } else return <Register />;
        }}
      />
    </PatientProvider>
  </>
);

export default WhereItHurts;
