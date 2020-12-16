import React from "react";
import { Route } from "react-router-dom";
import HealingForm from "./healings/HealingForm";
import HealingList from "./healings/HealingList";
import HealingProviders from "./providers/HealingProviders";

const HealingRoutes = (props) => {
  return (
    <HealingProviders>
      <Route exact path="/healings" render={(p) => <HealingList {...p} />} />
      <Route path="/healings/new" render={(p) => <HealingForm {...p} />} />
      <Route
        path="/healings/edit/:healingId(\d+)"
        render={(p) => <HealingForm {...p} />}
      />
    </HealingProviders>
  );
};

export default HealingRoutes;
