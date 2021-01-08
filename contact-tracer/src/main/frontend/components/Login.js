import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2.0rem;
  color: red;
  font-family: Verdana;
`;

const Section = styled.section`
  margin-top: 100px;
`;

const DivFlexedCenter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

function Login({notification, render}) {

  if (render) {
    return (
      <Section>
        {notification !== "" && <DivFlexedCenter>{notification}</DivFlexedCenter>}
        <DivFlexedCenter>
          <div className="login">
            <Title>
              Login
            </Title>
            <div>
              With GitHub: <a href="/oauth2/authorization/github">click here</a>
            </div>
          </div>
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