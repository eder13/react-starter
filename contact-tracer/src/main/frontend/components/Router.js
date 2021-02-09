/**
 * This file handles the Routes.
 * Only the Navbar component is always
 * rendered (it's layout depends on
 * if the user is logged in/out)
 * */

import React, {useEffect} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Contacts from "./Contacts";
import Home from "./Home";
import {useDispatch, useSelector} from "react-redux";
import {loadLogin, loadLoginUserId, loginInfoSelector} from "../store/auth/auth";
import PrivateRoute from "./PrivateRoute";

const Router = () => {

  const dispatch = useDispatch();
  const loginState = useSelector(loginInfoSelector);

  /** Authentication of User */
  // As soon as the site loads we check if the user is currently logged in
  // Check if user is logged in (checks if calling endpoints produces 401)
  // This loads user Context inside the store whenever page loads
  useEffect(() => {
    // load the username
    dispatch(loadLogin())
      .then((resolved) => {
        console.log("[auth]: user name call to endpoint succeeded.");
        if (resolved) {
          console.log("[auth]: user name successfully stored.");
          // load the userId
          dispatch(loadLoginUserId())
            .then((resolved) => {
              console.log("[auth]: user id call to endpoint succeeded.");
              if (resolved)
                console.log("[auth]: user id successfully stored.");
            })
            .catch(reason => console.error(reason));
        }
      })
      .catch(reason => console.error(reason));
  }, []);

  return (
    <BrowserRouter>
      <Navbar title="taskify."
              dash={!loginState.isAuthenticated ? "/login" : "/dashboard"}
              logout={loginState.isAuthenticated}/>
      <Switch>
        <Route exact path="/" render={() => <Home/>}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path="/dashboard" component={Contacts}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
