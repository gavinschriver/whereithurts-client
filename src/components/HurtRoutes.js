import React from "react";
import { Route, Switch } from "react-router-dom";
import HurtProviders from "./providers/HurtProviders";
import HurtForm from "./hurts/HurtForm";
import HurtList from "./hurts/HurtList";
import HurtDetail from "./hurts/HurtDetail";
import FourOhFourPage from "./auth/404Page";

const HurtRoutes = () => {
  return (
    <HurtProviders>
      <Switch>
        <Route path="/hurts/new" render={() => <HurtForm />} />
        <Route path="/hurts/edit/:hurtId(\d+)" render={() => <HurtForm />} />
        <Route exact path="/hurts" render={() => <HurtList />} />
        <Route path="/hurts/:hurtId(\d+)" render={() => <HurtDetail />} />
        <Route path="/hurts"> 
          <FourOhFourPage/>
        </Route>
      </Switch>
    </HurtProviders>
  );
};

export default HurtRoutes;
