import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";
import styled, { keyframes } from "styled-components";

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBox = styled.div`
  display: flex;
  justify-content: center;
  & > i {
    animation: ${animate} 1s linear infinite;
  }
`;

const Home = () => {

  // login Loading: Let firstly dispatch everything and see if user is still logged in
  const loading = useSelector(loadingBooleanSelector);

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>);
  } else {
    return (
      <Fragment>
        <h1>Contact Tracer</h1>
        <p>Contact is a Application that allows you to document your latest contacts.</p>
        <p>I was too lazy to style the front page, so here is a spinning cat instead:</p>
        <SpinningBox><i className="fas fa-cat fa-3x"></i></SpinningBox>
      </Fragment>
    );
  }
}

export default Home;