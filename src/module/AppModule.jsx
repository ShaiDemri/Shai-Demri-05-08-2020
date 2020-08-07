import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LazyComponent from "./LazyComponent";
import { Fade } from "@material-ui/core";

const Weather = LazyComponent(() => import("../pages/Weather"));
const Favorite = LazyComponent(() => import("../pages/Favorite"));
const PageNotFound = LazyComponent(() => import("../pages/404"));

const handleRouteChange = (Component) => {
  return ({ location }) => {
    console.log(location.path === window.location.pathname);
    console.log(location);
    return <Component />;
  };
};
function AppModule() {
  return (
    <Switch>
      <Route path="/" exact render={handleRouteChange(Weather)} />
      <Route path="/favorite" render={handleRouteChange(Favorite)} />
      <Route path="/404" render={handleRouteChange(PageNotFound)} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
}
export default React.memo(AppModule);
