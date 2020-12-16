import React from "react";
import { TreatmentProvider } from "../treatments/TreatmentProvider";

const TreatmentProviders = (props) => {
  return <TreatmentProvider>{props.children}</TreatmentProvider>;
};

export default TreatmentProviders
