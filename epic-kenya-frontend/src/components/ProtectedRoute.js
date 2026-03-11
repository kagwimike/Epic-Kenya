import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
