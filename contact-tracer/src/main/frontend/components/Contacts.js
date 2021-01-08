import React, {Fragment, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {filteredContactsSelector, loadContacts} from "../store/entities/reducers/contact";
import styled from "styled-components";
import ContactItem from "./ContactItem";
import Form from "./Form";

const EvenlySpaced = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 7rem;
`;

const Contacts = () => {

  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const filteredContacts = useSelector(filteredContactsSelector(searchString));

  useLayoutEffect(() => {
    dispatch(loadContacts()).then(res => console.log(res));
  }, []);

  const onChange = (e) => {
    setSearchString(e.target.value);
  }

  return (
    <Fragment>
      <Title as="h1">Dashboard</Title>
      <EvenlySpaced>
        <Form/>
        <div>
          {/*TODO: Check how to use styled components with inputs*/}
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
    </Fragment>
  );
}

export default Contacts;