import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LazyComponent from "./LazyComponent";

const Weather = LazyComponent(() => import("../pages/Weather"));
const Favorite = LazyComponent(() => import("../pages/Favorite"));
const PageNotFound = LazyComponent(() => import("../pages/404"));

const handleRouteChange = (Component) => {
  return ({ location }) => {
    return <Component />;
  };
};
function AppModule() {
  return (
    <Switch>
      <Redirect from="/Shai-Demri-05-08-2020" to="/" />
      <Route path="/" exact render={handleRouteChange(Weather)} />
      <Route path="/favorite" render={handleRouteChange(Favorite)} />
      <Route path="/404" render={handleRouteChange(PageNotFound)} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
}
export default React.memo(AppModule);
