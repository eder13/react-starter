import React, {useEffect, useState} from 'react';
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

const WorkSection = styled.section`
  display: flex;
  flex-flow: column;
  width: 94%;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

const WorkWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const WorkCheck = styled.div`
  margin: auto 2rem;
  width: 3rem;
  height: 3rem;
  margin-top: 2.2rem;
  border: none;
  position: relative;
  
  & input[type='checkbox'] {
    width: 3rem;
    height: 3rem;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    
    &:hover ~ .checkmark {
      background-color: rgb(187, 253, 235);
    }
  }
  
  & .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  
  & :checked ~ .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    background-color: rgb(0, 235, 191);
    border-radius: 50%;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    
    & .innerMark {
      width: 12px;
      height: 4px;
      background-color: white;
      z-index: 2;
      transform: rotate(225deg);
      margin-left: 0.7rem;
      position: relative;
      top: 4px;
      
      &::after {
        content: '';
        width: 24px;
        height: 4px;
        background-color: white;
        position: absolute;
        top: 10px;
        left: -10px;
        right: 10px;
        z-index: 1;
        transform: rotate(270deg);
      }
    }
  }
`;

const WorkCard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 150px;
  background-color: white;
  border-radius: 20px;
  margin: 0.3rem 0;
  
  & > div:first-child {
    align-self: center;
    margin-left: 1rem;
  }
`;

const WorkIcon = styled.h4`
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

        {/*<div style={{display: 'flex', justifyContent: 'center'}}>*/}
        {/*  <input style={{marginTop: '50px', width: '94%', marginLeft: 'auto', marginRight: 'auto'}} type="text"*/}
        {/*         value={searchString}*/}
        {/*         placeholder="Write a new task ..." onChange={onChange}/>*/}
        {/*</div>*/}

        <Form/>

        <WorkSection>
          <WorkIcon>
            <i className="fas fa-circle fa-xs" style={{color: 'rgb(94, 124, 255)', padding: '0.2rem'}}>{}</i>
            Work
          </WorkIcon>
          <WorkWrapper>
            {/*TODO: WorkItem*/}
            <WorkCard>
              <div style={{backgroundColor: 'rgb(94, 124, 255)', height: '70%', width: '4px'}}>{}</div>
              <WorkCheck>
                <input type="checkbox"/>
                <span className="checkmark">
                <span className="innerMark"/>
              </span>
              </WorkCheck>
              <div>
                <h3>Title</h3>
                <p>Lorem Ipsum Dolor amet.</p>
                <p>Due to:&nbsp;<span style={{color: 'rgb(94, 124, 255)', fontWeight: 'bold'}}>23.12.1997</span></p>
              </div>
            </WorkCard>
          </WorkWrapper>
        </WorkSection>

        <WorkSection>
          <WorkIcon>
            <i className="fas fa-circle fa-xs" style={{color: 'rgb(255, 184, 0)', padding: '0.2rem'}}>{}</i>
            Home
          </WorkIcon>
          <WorkWrapper>
            {/*TODO: HomeItem*/}
            <WorkCard>
              <div style={{backgroundColor: 'rgb(255, 184, 0)', height: '70%', width: '4px'}}>{}</div>
              <WorkCheck>
                <input type="checkbox"/>
                <span className="checkmark">
                <span className="innerMark"/>
              </span>
              </WorkCheck>
              <div>
                <h3>Title</h3>
                <p>Lorem Ipsum Dolor amet.</p>
                <p style={{color: 'rgb(255, 184, 0)', fontWeight: 'bold'}}>23.12.1997, 16:00</p>
              </div>
            </WorkCard>
            <WorkCard>
              <div style={{backgroundColor: 'rgb(255, 184, 0)', height: '70%', width: '4px'}}>{}</div>
              <WorkCheck>
                <input type="checkbox"/>
                <span className="checkmark">
                <span className="innerMark"/>
              </span>
              </WorkCheck>
              <div>
                <h3>Title</h3>
                <p>Lorem Ipsum Dolor amet.</p>
                <p style={{color: 'rgb(255, 184, 0)', fontWeight: 'bold'}}>23.12.1997, 16:00</p>
              </div>
            </WorkCard>
          </WorkWrapper>
        </WorkSection>

        {/*TODO: Old Contacts*/}
        {/*<EvenlySpaced>*/}
        {/*  <Form/>*/}
        {/*  <div>*/}
        {/*    <input style={{marginTop: '50px', width: '100%'}} type="text" value={searchString}*/}
        {/*           placeholder="Search Contacts ..." onChange={onChange}/>*/}
        {/*    <TransitionGroup>*/}
        {/*      {filteredContacts.map((contact, index) =>*/}
        {/*        <CSSTransition key={contact._links.self.href} timeout={500} classNames="item">*/}
        {/*          <ContactItem contact={contact} index={index}/>*/}
        {/*        </CSSTransition>*/}
        {/*      )}*/}
        {/*    </TransitionGroup>*/}
        {/*  </div>*/}
        {/*</EvenlySpaced>*/}
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