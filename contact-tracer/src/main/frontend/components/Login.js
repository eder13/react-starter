import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

Login.propTypes = {};

function Login({info, render}) {

  if(render) {
    return (
      <section className="main">
        {info !== "" && <div className="container">{info}</div>}
        <div className="container">
          <div className="login">
            <h1>Login</h1>
            <div>
              With GitHub: <a href="/oauth2/authorization/github">click here</a>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="main" style={{textAlign: 'center', fontSize: '1.3rem'}}>
        You are logged in! <Link to="/dashboard">proceed to the side</Link>.
      </section>
    );
  }
}

export default Login;