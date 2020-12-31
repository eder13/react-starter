import React, {useEffect} from 'react';
import {loadLogin} from "../store/auth/auth";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

/// TODO: Work with store

Login.propTypes = {

};

function Login() {

  const dispatch = useDispatch();
  const loginState = useSelector(); /// TODO: paste selector

  useEffect(() => {

    dispatch(loadLogin());

  }, []);

  // conditional -> return login if authenticated or show user info
  return (
    <div></div>
  );
}

export default Login;