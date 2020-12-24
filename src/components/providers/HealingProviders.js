import React from "react";
import { BodypartProvider } from "../bodypart/BodypartProvider";
import { HealingProvider } from "../healings/HealingProvider";
import { HurtProvider } from "../hurts/HurtProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";
import { TreatmentTypeProvider } from "../treatmenttypes/TreatmentTypeProvider";

const HealingProviders = (props) => {
  return (
    <HealingProvider>
      <HurtProvider>
        <BodypartProvider>
          <TreatmentTypeProvider>
            <TreatmentProvider>{props.children}</TreatmentProvider>
          </TreatmentTypeProvider>
        </BodypartProvider>
      </HurtProvider>
    </HealingProvider>
  );
};

export default HealingProviders;
