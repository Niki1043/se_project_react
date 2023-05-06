import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, userLoggedIn, ...props }) {
  return (
    <Route {...props}>{userLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
