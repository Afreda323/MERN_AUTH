import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      token ? <Component {...props} /> : <Redirect to="/" />}
  />;

export default PrivateRoute;
