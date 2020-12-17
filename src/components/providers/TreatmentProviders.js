import React from "react";
import { BodypartProvider } from "../bodypart/BodypartProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";
import { TreatmentTypeProvider } from "../treatmenttypes/TreatmentTypeProvider";

const TreatmentProviders = (props) => {
  return (
    <TreatmentProvider>
      <TreatmentTypeProvider>
        <BodypartProvider>{props.children}</BodypartProvider>
      </TreatmentTypeProvider>
    </TreatmentProvider>
  );
};

export default TreatmentProviders;
