/**
 * This file handles the Routes.
 * Only the Navbar component is always
 * rendered (it's layout depends on
 * if the user is logged in/out)
 * */

import React, {useLayoutEffect} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Contacts from "./Contacts";
import styled from "styled-components";
import Home from "./Home";
import {useDispatch, useSelector} from "react-redux";
import {loadLogin, loadLoginUserId, loginInfoSelector} from "../store/auth/auth";

const StyledLink = styled(Link)`
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  color: white;
  background-color: rgb(0, 167, 135);
`;

const Router = () => {

  const dispatch = useDispatch();
  const loginState = useSelector(loginInfoSelector);

  useLayoutEffect(() => {
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
      <Navbar title="fas fa-viruses" user={loginState.isAuthenticated ? loginState.user : "You are not signed in"}
              dash={!loginState.isAuthenticated ? <StyledLink to="/login">Login</StyledLink> :
                <StyledLink to="/dashboard">Dashboard</StyledLink>}
              logout={loginState.isAuthenticated}/>
      <Switch>
        <Route exact path="/" render={() => <Home/>}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard"
               component={Contacts}/> {/*TODO: this should be protected - any special functionality?*/}
      </Switch>
    </BrowserRouter>
  );

}

export default Router;
