import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {filteredContactsSelector, loadContacts} from "../store/entities/reducers/contact";
import styled from "styled-components";
import ContactItem from "./ContactItem";
import Form from "./Form";
import {loadingBooleanSelector, loginInfoSelector} from "../store/auth/auth";

const EvenlySpaced = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  text-align: center;
  color: rgb(34, 27, 113);
`;

const Main = styled.main`
  padding-top: 4rem;
  background-color: rgb(245, 246, 251);
  min-height: 100vh;
`;

const Work = styled.h4`
  text-align: left;
  display: flex;
`;

const Contacts = () => {

  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const filteredContacts = useSelector(filteredContactsSelector(searchString));
  const loginState = useSelector(loginInfoSelector);
  const loading = useSelector(loadingBooleanSelector);

  // This is only needed if we don't use PrivateRoutes Layer -> Otherwise private route first called and then this
  // useEffect(() => {
  //   // only dispatch the action, when user info already loaded
  //   // so the Component where we get user info has to be mounted
  //   // first before we call this --> loginState.isAuthenticated must be true
  //   if(loginState.isAuthenticated)
  //     dispatch(loadContacts()).then(res => console.log(res));
  // }, [loginState.isAuthenticated]);

  useEffect(() => {
    dispatch(loadContacts()).then(res => console.log(res));
  }, [])

  const onChange = (e) => {
    setSearchString(e.target.value);
  }

  if (!loading) {
    return (
      <Main>
        <Title as="h3"> Hi {loginState.user} 👋</Title>
        <p style={{textAlign: 'center'}}>Got some new tasks? ✅</p>

        <Work><i className="fas fa-circle fa-xs" style={{color: 'rgb(94, 124, 255)', padding: '0.2rem'}}></i> <span>Work</span></Work>
        <div>

        </div>

        <EvenlySpaced>
          <Form/>
          <div>
            <input style={{marginTop: '50px', width: '100%'}} type="text" value={searchString}
                   placeholder="Search Contacts ..." onChange={onChange}/>
            <TransitionGroup>
              {filteredContacts.map((contact, index) =>
                <CSSTransition key={contact._links.self.href} timeout={500} classNames="item">
                  <ContactItem contact={contact} index={index}/>
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        </EvenlySpaced>
      </Main>
    );
  } else {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>);
  }
}

export default Contacts;