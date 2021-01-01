import React, {Fragment, useLayoutEffect} from "react";
import {loadLogin, loadLogout, loginInfoSelector} from "../store/auth/auth";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "./Navbar";

function Login() {
  const dispatch = useDispatch();
  const loginState = useSelector(loginInfoSelector);

  useLayoutEffect(() => {
    dispatch(loadLogin());
  }, []);

  // conditional -> return login if authenticated or show user info
  if (loginState.loading) {
    return <strong>Loading ...</strong>;
  } else {
    if (loginState.userId === "" || loginState.user === "") {
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
        <Fragment>
          <Navbar title="fas fa-viruses" user="You are not signed in"/>
          {info !== "" && <div className="container">{info}</div>}
          <div className="container">
            <div className="login">
              <h1>Login</h1>
              <div>
                With GitHub: <a href="/oauth2/authorization/github">click here</a>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      // TODO: Route to /dashboard
      return (
        <Fragment>
          <Navbar title="fas fa-viruses" user={loginState.user}/>
          Hello {loginState.user} with id {loginState.userId}
          <button onClick={(e) => dispatch(loadLogout())}>logout</button>
        </Fragment>
      );
    }
  }
}

export default Login;
