import React from "react";
import { BASE_URL } from "../../utils/request";
import { HealingProvider } from "../healings/HealingProvider";
import { TreatmentProvider } from "../treatments/TreatmentProvider";


const HealingProviders = (props) => {
  return (
    <HealingProvider>
      <TreatmentProvider>{props.children}</TreatmentProvider>
    </HealingProvider>
  );
};

export default HealingProviders;
