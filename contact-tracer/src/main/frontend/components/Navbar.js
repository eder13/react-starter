import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingBooleanSelector, loadLogout} from "../store/auth/auth";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  padding: 0 20px;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  color: #555;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  ${props => props.secondary && "color: #000; background-color: rgb(248, 249, 250); border-color: #ff974c;"};
  ${props => props.warning && "background-color: rgb(255, 194, 0); height: 38px; margin: 0.5rem 0rem;"};  
  border-radius: 4px;
  border: 1px soLid #bbb;
  cursor: pointer;
  width: 100%;
`;

const NavbarWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 56px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: lightblue;
  color: rgb(34, 27, 113);
`;

const Logo = styled.div`
  padding: 0.5rem 0;
  
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(34, 27, 113);
  font-size: 1.3rem;
  font-family: 'Ubuntu', sans-serif;
`;

const Nav = styled.nav`
  position: fixed;
  top: 56px;
  right: 0;
  width: 30%;
  height: 100px;
  border-radius: 10px;
  z-index: 2;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgb(229, 246, 249);
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 31px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
  }
  
  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    
    & li {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      border: 1px solid lightblue;
      flex: 1;
      
      &:first-child {
        border-radius: 10px 10px 0 0;
      }      
      
      &:last-child {
        border-radius: 0px 0px 10px 10px;
      }
      
      & ${StyledLink} {
        font-size: 1.0rem;
      }
    }
  }
`;

const HamburgerToggle = styled.input`

  &:checked ~ ${Nav} {
    display: flex;
  }
  
  position: fixed;
  right: 14px;
  width: 42px;
  height: 40px;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
  
`;

const Hamburger = styled.div`
  width: 42px;
  height: 40px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 50%;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);

  & > div {
    width: 50%;
    height: 2px;
    outline: 0.5px solid black;
    background-color: black;
    position: relative;
    
    &:before {
      content: "";
      position: absolute;
      background-color: black;
      top: -8px;
      width: 100%;
      height: 2px;
      outline: 0.5px solid black;
    }

    &:after {
      content: "";
      position: absolute;
      background-color: black;
      top: 8px;
      width: 100%;
      height: 2px;
      outline: 0.5px solid black;
    }
  }
`;

const Navbar = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingBooleanSelector);

  if (!loading) {
    return (
      <NavbarWrapper>
        <Logo>
          <StyledLink to="/">{props.title}</StyledLink>
        </Logo>

        <HamburgerToggle type="checkbox"/>
        <Hamburger>
          <div>{}</div>
        </Hamburger>
        <Nav>
          <ul>
            <li><StyledLink to="/">home</StyledLink></li>
            <li><StyledLink to={props.dash}>{props.dash.replace("/", "")}</StyledLink></li>
            {props.logout &&
            <li>
              <Button style={{padding: '0 0.5rem'}} secondary onClick={
                () => {
                  dispatch(loadLogout()).then((resolve) => {
                    if (resolve)
                      window.location.href = "/";
                  });
                }}>
                <i className="fas fa-sign-out-alt"/>
              </Button>
            </li>}
          </ul>
        </Nav>
      </NavbarWrapper>
    );
  } else {
    return <Fragment>{}</Fragment>;
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  dash: PropTypes.object.isRequired,
  logout: PropTypes.bool.isRequired,
};

export default Navbar;