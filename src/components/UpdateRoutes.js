import React from "react";
import { Route, Switch } from "react-router-dom";
import UpdateForm from "./updates/UpdateForm";
import UpdateList from "./updates/UpdateList";
import UpdateProviders from "./providers/UpdateProviders";
import UpdateDetail from "./updates/UpdateDetail";
import FourOhFourPage from "./auth/404Page";

const UpdateRoutes = () => {
  return (
    <UpdateProviders>
      <Switch>
        <Route path="/updates/new" render={() => <UpdateForm />} />
        <Route
          path="/updates/edit/:updateId(\d+)"
          render={() => <UpdateForm />}
        />
        <Route exact path="/updates" render={() => <UpdateList />} />
        <Route path="/updates/:updateId(\d+)" render={() => <UpdateDetail />} />
        <Route path="/updates">
          <FourOhFourPage />
        </Route>
      </Switch>
    </UpdateProviders>
  );
};

export default UpdateRoutes;
