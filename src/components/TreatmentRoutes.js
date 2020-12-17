import React from "react";
import { Route } from "react-router-dom";
import TreatmentProviders from "./providers/TreatmentProviders";
import TreatmentForm from "./treatments/TreatmentForm";

const TreatmentRoutes = (props) => {
  return (
    <TreatmentProviders>
      <Route path="/treatments/new" render={(p) => <TreatmentForm {...p} />} />
      <Route path="/treatments/edit/:treatmentId(\d+)" render={(p) => <TreatmentForm {...p} />} />
    </TreatmentProviders>
  );
};

export default TreatmentRoutes;
