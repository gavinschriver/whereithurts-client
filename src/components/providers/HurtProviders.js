import React from "react";
import { BodypartProvider } from "../bodypart/BodypartProvider";
import { HurtProvider } from "../hurts/HurtProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";
import { TreatmentTypeProvider } from "../treatmenttypes/TreatmentTypeProvider";

const HurtProviders = (props) => {
  return (
    <HurtProvider>
      <TreatmentProvider>
        <TreatmentTypeProvider>
          <BodypartProvider>
            <BodypartProvider>{props.children}</BodypartProvider>
          </BodypartProvider>
        </TreatmentTypeProvider>
      </TreatmentProvider>
    </HurtProvider>
  );
};

export default HurtProviders;
