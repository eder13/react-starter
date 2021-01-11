import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";

const Home = () => {

  // login Loading: Let firstly dispatch everything and see if user is still logged in
  const loading = useSelector(loadingBooleanSelector);

  /// TODO: Let's make this front page beautiful with styled components


  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>);
  } else {
    return (
      <Fragment>
        <h1>Contact Tracer</h1>
        <p>Contact is a Application that allows you to ...</p>
      </Fragment>
    );
  }
}

export default Home;