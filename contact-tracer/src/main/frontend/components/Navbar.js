import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadLogout} from "../store/auth/auth";
import styled from "styled-components";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

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
  ${props => props.primary && "background-color: transparent; height: 38px; margin: 0.5rem 0rem;"};
  ${props => props.secondary && "color: #000; background-color: rgb(248, 249, 250); border-color: #ff974c;"};
  ${props => props.danger && "background-color: rgb(240, 0, 57); height: 38px; margin: 0.5rem 0rem;"}; 
  ${props => props.warning && "background-color: rgb(255, 194, 0); height: 38px; margin: 0.5rem 0rem;"};  
  border-radius: 4px;
  border: 1px soLid #bbb;
  cursor: pointer;
  width: 100%;
`;

const HorizontalNavbar = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: #333;
  color: white;
`;

const NavbarNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Logo = styled.div`
  padding: 0.5rem 0;
`;

const Ul = styled.ul`
  List-style-type: none;
  display: flex;
  flex-flow: row nowrap;
`;

const Li = styled.li`
  margin: 0 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;


function Navbar(props) {
  const dispatch = useDispatch();

  return (
    <HorizontalNavbar>
      <Logo>
        <StyledLink to="/"><i style={{color: 'red'}} className={props.title + " fa-3x"}/></StyledLink>
      </Logo>
      <NavbarNav>
        <Ul>
          <Li>{props.user}</Li>
          <Li><StyledLink to="/"><i className="fas fa-home">{}</i></StyledLink></Li>
          <Li>{props.dash}</Li>
          <Li style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.logout &&
            <Button style={{padding: '0 0.5rem'}} secondary onClick={
              (e) => {
                dispatch(loadLogout());
                // redirect to homepage
                window.location.href = "/";
              }}>
              <i className="fas fa-sign-out-alt" />
            </Button>}
          </Li>
        </Ul>
      </NavbarNav>
    </HorizontalNavbar>
  );
}

export default Navbar;