import React from "react";
import { Route, Switch } from "react-router-dom";
import FourOhFourPage from "./auth/404Page";
import HealingDetail from "./healings/HealingDetail";
import HealingForm from "./healings/HealingForm";
import HealingList from "./healings/HealingList";
import HealingProviders from "./providers/HealingProviders";

const HealingRoutes = (props) => {
  return (
    <HealingProviders>
      <Switch>
        <Route exact path="/healings" render={(p) => <HealingList {...p} />} />
        <Route path="/healings/new" render={(p) => <HealingForm {...p} />} />
        <Route
          path="/healings/edit/:healingId(\d+)"
          render={(p) => <HealingForm {...p} />}
        />
        <Route
          path="/healings/:healingId(\d+)"
          render={(p) => <HealingDetail />}
        />
        <Route path="/healings">
          <FourOhFourPage />
        </Route>
      </Switch>
    </HealingProviders>
  );
};

export default HealingRoutes;
