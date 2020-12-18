import React from "react";
import { Route } from "react-router-dom";
import TreatmentProviders from "./providers/TreatmentProviders";
import TreatmentDetail from "./treatments/TreatmentDetail";
import TreatmentForm from "./treatments/TreatmentForm";
import TreatmentList from "./treatments/TreatmentList";

const TreatmentRoutes = (props) => {
  return (
    <TreatmentProviders>
      <Route path="/treatments/new" render={(p) => <TreatmentForm {...p} />} />
      <Route
        path="/treatments/edit/:treatmentId(\d+)"
        render={(p) => <TreatmentForm {...p} />}
      />
      <Route exact path="/treatments" render={(p) => <TreatmentList {...p} />} />
      <Route path="/treatments/:treatmentId(\d+)" render={(p) => <TreatmentDetail {...p} />} />
    </TreatmentProviders>
  );
};

export default TreatmentRoutes;
