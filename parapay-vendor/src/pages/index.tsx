import React, { Suspense } from "react";
import { PrivateRoute } from "./components";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import { Switch, Route } from "react-router-dom";
import "../styles/App.scss";
import "../styles/index.scss";

const Pages: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/" component={Auth} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  );
};

export default Pages;
