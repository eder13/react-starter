import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";
import styled from "styled-components";

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
  
  & > p {
    background-color: blue;
  }
  
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
        <Thing3>I am blue with a white background and a red hover!</Thing3>
        <Thing3 color="red" bgColor="black" hover="white">I am red with a black background and white hover!</Thing3>
        <Thing3 color="black">Text <p>Styled</p></Thing3>

      </Fragment>
    );
  }
}

export default Home;