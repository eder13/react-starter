import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";
import styled from "styled-components";

const Section = styled.section`
  background-color: rgb(229, 246, 249);
  height: 100vh;
  color: rgb(34, 27, 113);
  margin-top: 0;
  padding-top: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  
  & h1 {
    margin: 0 0;
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
      <Section>
        <h1>Manage Tasks with a breeze.</h1>
        <p>taskify helps you to keep your brain organized.</p>
      </Section>
    );
  }
}

export default Home;