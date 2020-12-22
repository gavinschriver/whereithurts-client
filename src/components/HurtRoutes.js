import React from "react";
import { Route } from "react-router-dom";
import HurtProviders from "./providers/HurtProviders";
import HurtForm from "./hurts/HurtForm";
import HurtList from "./hurts/HurtList";
import HurtDetail from "./hurts/HurtDetail";

const HurtRoutes = () => {
  return (
    <HurtProviders>
      <Route path="/hurts/new" render={() => <HurtForm />} />
      <Route path="/hurts/edit/:hurtId(\d+)" render={() => <HurtForm />} />
      <Route exact path="/hurts" render={() => <HurtList />} />
      <Route path="/hurts/:hurtId(\d+)" render={() => <HurtDetail/> } />
    </HurtProviders>
  );
};

export default HurtRoutes;
