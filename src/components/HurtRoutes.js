import React from "react";
import { Route } from "react-router-dom";
import HurtProviders from "./providers/HurtProviders";
import HurtForm from "./hurts/HurtForm";
import HurtList from "./hurts/HurtList";

const HurtRoutes = (props) => {
  return (
    <HurtProviders>
      <Route path="/hurts/new" render={(p) => <HurtForm />} />
      <Route path="/hurts/edit/:hurtId(\d+)" render={(p) => <HurtForm />} />
      <Route exact path="/hurts" render={(p) => <HurtList />} />
    </HurtProviders>
  );
};

export default HurtRoutes;
