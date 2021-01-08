import React, {useLayoutEffect} from "react";
import {loadLogin, loadLoginUserId, loginInfoSelector} from "../store/auth/auth";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Contacts from "./Contacts";
import styled from "styled-components";

const Notification = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${props => props.info ? "#bce8f1" : "#f5c6cb"};
  background-color: ${props => props.info ? "#d9edf7" : "#f8d7da"};
  color: ${props => props.info ? "#31708f" : "#721c24"};
`;

function Home() {
  const dispatch = useDispatch();
  const loginState = useSelector(loginInfoSelector);

  useLayoutEffect(() => {
    // load the username
    dispatch(loadLogin())
      .then((resolved) => {
        if (resolved)
          dispatch(loadLoginUserId());
      })
      .catch(reason => console.log(reason));
  }, []);

  if (loginState.loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>
    );
  } else {

    let notification;
    if (loginState.notification.error !== "" || loginState.notification.type !== "") {
      if (loginState.notification.type === "error") {
        notification = (
          <Notification>
            <p>
              <i className="fas fa-info-circle"/>
              {" " + loginState.notification.error}
            </p>
          </Notification>
        );
      } else {
        notification = (
          <Notification info>
            <p>
              <i className="fas fa-info-circle"/>
              {" " + loginState.notification.error}
            </p>
          </Notification>
        );
      }
    } else {
      notification = "";
    }

    return (
      <Router>
        <Navbar title="fas fa-viruses" user={loginState.user !== "" ? loginState.user : "You are not signed in"}
                dash={loginState.user !== "" ? <Link to="/dashboard">Dashboard</Link> : ""}
                logout={loginState.user !== ""}/>
        <Switch>
          <Route exact path="/" render={() => <Login notification={notification} render={loginState.user === ""}/>}/>
          <Route exact path="/dashboard"
                 render={() => <Contacts userId={loginState.userId}/>}/> {/*TODO: this should be protected*/}
        </Switch>
      </Router>
    );
  }
}

export default Home;
