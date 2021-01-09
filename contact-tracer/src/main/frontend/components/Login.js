import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  margin-top: 100px;
`;

const DivFlexedCenter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const LoginContainer = styled.div`
  margin-top: 2rem;
  width: 30rem;
  height: 18rem;
  background-color: rgb(232, 232, 232);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 3px 3px 5px 6px #ccc;
`;

const LoginIconUserContainer = styled.div`
  border-radius: 50%;
  background-color: #333; 
  width: 5rem; 
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  font-size: 1.2rem;
  margin: 1rem;
  border-radius: 5px;
  text-decoration: none;
  padding: 1rem 1.5rem;
  color: white;
  background-color: rgb(69, 69, 69);
  text-align: center;
`;

function Login({notification, render}) {

  if (render) {
    return (
      <Section>
        {notification !== "" && <DivFlexedCenter>{notification}</DivFlexedCenter>}
        <DivFlexedCenter>
          <LoginContainer>
            <LoginIconUserContainer>
              <i style={{color: "whitesmoke"}} className="fas fa-users fa-3x">{}</i>
            </LoginIconUserContainer>
            <LoginButton as="a" href="/oauth2/authorization/github">
              <i className="fab fa-github fa-1x">{}</i>&nbsp;Login With Github
            </LoginButton>
          </LoginContainer>
        </DivFlexedCenter>
      </Section>
    );
  } else {
    return (
      <Section>
        <DivFlexedCenter>
          You are logged in!&nbsp;<Link to="/dashboard">proceed to the side</Link>
        </DivFlexedCenter>
      </Section>
    );
  }
}

export default Login;