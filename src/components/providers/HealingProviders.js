import React from "react";
import { HealingProvider } from "../healings/HealingProvider";
import { HurtProvider } from "../hurts/HurtProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";

const HealingProviders = (props) => {
  return (
    <HealingProvider>
      <HurtProvider>
        <TreatmentProvider>{props.children}</TreatmentProvider>
      </HurtProvider>
    </HealingProvider>
  );
};

export default HealingProviders;
