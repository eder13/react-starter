import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {filteredContactsSelector, loadContacts} from "../store/entities/reducers/contact";
import ContactItem from "./ContactItem";
import Form from "./Form";

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

  console.log(filteredContacts.length)

  return (
    <section className="main">
      <div style={{marginTop: '2rem'}}><h1 style={{textAlign: 'center'}}>Dashboard</h1></div>
      <div className="container-even">
        <div>
          <Form/>
        </div>
        <div>
          <input style={{width: '100%', marginTop: '50px'}} type="text" value={searchString}
                 placeholder="Search Contacts ..." onChange={onChange}/>
          <TransitionGroup>
            {filteredContacts.map(contact =>
              <CSSTransition key={contact._links.self.href} timeout={500} classNames="item">
                <ContactItem contact={contact}/>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </div>
    </section>
  );
}

export default Contacts;