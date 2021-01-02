import React, {Fragment, useLayoutEffect} from "react";
import {loadLogin, loadLogout, loginInfoSelector} from "../store/auth/auth";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";

function Home() {
  const dispatch = useDispatch();
  const loginState = useSelector(loginInfoSelector);

  useLayoutEffect(() => {
    dispatch(loadLogin());
  }, []);

  if (loginState.loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>
    );
  } else {

    let info;
    if (
      loginState.notification.error !== "" ||
      loginState.notification.type !== ""
    ) {
      info = (
        <div className={loginState.notification.type}>
          <p>
            <i className="fas fa-info-circle"/>
            {" " + loginState.notification.error}
          </p>
        </div>
      );
    } else {
      info = "";
    }

    return (
      <Router>
        <Navbar title="fas fa-viruses" user={loginState.user !== "" ? loginState.user : "You are not signed in"}
                dash={loginState.user !== "" ? <Link to="/dashboard">Dashboard</Link> : ""}
                logout={loginState.user !== ""}/>
        <Switch>
          <Route exact path="/" render={() => <Login info={info} render={loginState.user === ""}/>}/>
          <Route exact path="/dashboard" component={Dashboard}/> {/*TODO: this should be protected*/}
        </Switch>
      </Router>
    );
  }
}

export default Home;
