import React from "react";
import { BodypartProvider } from "../bodypart/BodypartProvider";
import { HurtProvider } from "../hurts/HurtProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";
import { TreatmentTypeProvider } from "../treatmenttypes/TreatmentTypeProvider";

const TreatmentProviders = (props) => {
  return (
    <TreatmentProvider>
      <TreatmentTypeProvider>
        <HurtProvider>
          <BodypartProvider>{props.children}</BodypartProvider>
        </HurtProvider>
      </TreatmentTypeProvider>
    </TreatmentProvider>
  );
};

export default TreatmentProviders;
