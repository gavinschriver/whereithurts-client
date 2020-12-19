import React from "react";
import { BodypartProvider } from "../bodypart/BodypartProvider";
import { HurtProvider } from "../hurts/HurtProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";

const HurtProviders = (props) => {
  return (
    <HurtProvider>
      <TreatmentProvider>
        <BodypartProvider>{props.children}</BodypartProvider>
      </TreatmentProvider>
    </HurtProvider>
  );
};

export default HurtProviders;
