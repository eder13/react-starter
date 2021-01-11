import React, {useLayoutEffect} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {loadingBooleanSelector, loginInfoSelector} from "../store/auth/auth";

const Section = styled.section`
  margin-top: 100px;
`;

const DivFlexedCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
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

const Notification = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${props => props.info ? "#bce8f1" : "#f5c6cb"};
  background-color: ${props => props.info ? "#d9edf7" : "#f8d7da"};
  color: ${props => props.info ? "#31708f" : "#721c24"};
`;

const Login = (props) => {

  // loginInfoSelector
  const loginState = useSelector(loginInfoSelector);
  const loading = useSelector(loadingBooleanSelector);

  useLayoutEffect(() => {
    // check if user is authenticated - redirect if yes
    if (loginState.isAuthenticated)
      props.history.push("/dashboard");

  }, [loginState.isAuthenticated]);

  if (!loading) {
    return (
      <Section>
        <DivFlexedCenter>
          {loginState.notification.error !== "" &&
          <Notification>
            {loginState.notification.error}
          </Notification>
          }
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
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>
    );
  }
}

export default Login;