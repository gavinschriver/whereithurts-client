import React from "react";
import { Route } from "react-router-dom";
import HurtProviders from "./providers/HurtProviders";
import HurtForm from "./hurts/HurtForm";

const HurtRoutes = (props) => {
  return (
    <HurtProviders>
      <Route path="/hurts/new" render={(p) => <HurtForm />} />
    </HurtProviders>
  );
};

export default HurtRoutes;
