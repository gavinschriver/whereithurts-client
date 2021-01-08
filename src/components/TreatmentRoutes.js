import React from "react";
import { Route, Switch } from "react-router-dom";
import FourOhFourPage from "./auth/404Page";
import TreatmentProviders from "./providers/TreatmentProviders";
import TreatmentDetail from "./treatments/TreatmentDetail";
import TreatmentForm from "./treatments/TreatmentForm";
import TreatmentList from "./treatments/TreatmentList";

const TreatmentRoutes = () => {
  return (
    <TreatmentProviders>
      <Switch>
        <Route
          path="/treatments/new"
          render={(p) => <TreatmentForm {...p} />}
        />
        <Route
          path="/treatments/edit/:treatmentId(\d+)"
          render={(p) => <TreatmentForm {...p} />}
        />
        <Route
          exact
          path="/treatments"
          render={(p) => <TreatmentList {...p} />}
        />
        <Route
          path="/treatments/:treatmentId(\d+)"
          render={(p) => <TreatmentDetail />}
        />
        <Route path="/treatments">
          <FourOhFourPage/>
        </Route>
      </Switch>
    </TreatmentProviders>
  );
};

export default TreatmentRoutes;
