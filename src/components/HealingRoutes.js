import React from "react";
import { Route } from "react-router-dom";
import HealingForm from "./healings/HealingForm";
import HealingProviders from "./providers/HealingProviders";

const HealingRoutes = (props) => {
  return (
    <HealingProviders>
      <Route path="/healings/new" render={(p) => <HealingForm {...p} />} />
      <Route path="/healings/edit/:healingId(\d+)" render={(p) => <HealingForm {...p}/>} /> 
    </HealingProviders>
  );
};

export default HealingRoutes;
