import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

Login.propTypes = {};

function Login({info, render}) {

  if(render) {
    return (
      <Fragment>
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
    return (
      <div style={{textAlign: 'center', marginTop: '2rem', fontSize: '1.3rem'}}>
        You are logged in! <Link to="/dashboard">proceed to the side</Link>.
      </div>
    );
  }
}

export default Login;