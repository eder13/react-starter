import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";
import styled, { keyframes } from "styled-components";

const Thing = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 100px;
  height: 100px;
  margin: 50px;
  padding: 10px;
`;

const Thing2 = styled.div.attrs(props => ({
  setColor: (props.color ? props.color : "blue"), // “dynamic delegating prop”,
  setMargin: "50px" // static prop
}))`
  color: ${props => props.setColor};
  margin: ${props => props.setMargin};
  text-align: center;
`;

const Thing3 = styled.div.attrs(props => ({
  textColor: (props.color ? props.color : "blue"),
  hoverColor: (props.hover ? props.hover : "red"),
  bgColor: (props.bgColor ? props.bgColor : "white"),
}))`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  width: 400px;
  height: 20px;
  
  &:hover {
    color: ${props => props.hoverColor}
  }
  
  & p {
    background-color: yellow;
  }
  
  & p:first-child {
    background-color: red;
  }
  
`;

const Thing4 = styled.div.attrs(props => ({

}))`
  width: 400px;
  height: 50px;
  color: green;
  position: static;
  
  & + & {
    background-color: red;
  }
`;

const Thing5 = styled.div.attrs(props => ({

}))`
  & > p[id] {
    background-color: blue;
  }
`;

const Thing6 = styled.div.attrs(props => ({

}))`
  & > input {
    background-color: red;
  }

  & > input[type="button"] {
    background-color: green;
  }
`;

const Thing7 = styled.div`
  &.something {
    background-color: red;
  }
`;

const Thing8 = styled.div`
  .something-else & {
    background-color: red;
  }
`;

const Thing9 = styled.div`
  &.start ~ &.next {
    background-color: tomato;
  }
`;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
  animation: ${animate} 1s linear infinite;
`;

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

        <Thing backgroundColor="blue">Test1</Thing>

        {/*Thing2 with props over .attr*/}
        <Thing2>Thing2</Thing2>
        <Thing2 color="red">Thing2</Thing2>

        {/*Thing3 with props over .attr and sudo selectors*/}
        {/*<Thing3>I am blue with a white background and a red hover!</Thing3>*/}
        {/*<Thing3 color="red" bgColor="black" hover="white">I am red with a black background and white hover!</Thing3>*/}
        {/*<Thing3 color="black">*/}
        {/*  Text*/}
        {/*  <p>Styled</p>*/}
        {/*  <p>Styled2</p>*/}
        {/*</Thing3>*/}

        {/*<Thing4>Thing4</Thing4>*/}
        {/*<Thing4>I am the next parent div with a red background!</Thing4>*/}

        {/*<Thing5>*/}
        {/*  <p id="p">Hello</p>*/}
        {/*  <p>Hi</p>*/}
        {/*  <div>*/}
        {/*    <p>*/}
        {/*      Yo*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</Thing5>*/}

        {/*<Thing6>*/}
        {/*  <input defaultValue="red bg" />*/}
        {/*  <input type="button" value="green bg"/>*/}
        {/*</Thing6>*/}

        {/*<Thing7>*/}
        {/*  Without Something*/}
        {/*</Thing7>*/}
        {/*<Thing7 className="something">*/}
        {/*  With Something*/}
        {/*</Thing7>*/}

        {/*<div className="something-else">*/}
        {/*  <Thing8>Test</Thing8>*/}
        {/*</div>*/}

        {/*<Thing9 className="next">Next before Start</Thing9>*/}
        {/*<Thing9 className="next">Next before Start</Thing9>*/}
        {/*<Thing9 className="start">Start</Thing9>*/}
        {/*<Thing9 className="next">Next after Start</Thing9>*/}
        {/*<Thing9 className="next">Next after Start</Thing9>*/}
        {/*<Thing9 className="start">Start</Thing9>*/}
        {/*<Thing9 className="next">Next after second Start</Thing9>*/}

        <SpinningBox>{}</SpinningBox>

      </Fragment>
    );
  }
}

export default Home;