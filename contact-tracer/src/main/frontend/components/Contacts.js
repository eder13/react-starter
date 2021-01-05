import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allContactsSelector, loadContacts} from "../store/entities/reducers/contact";
import ContactItem from "./ContactItem";
import Form from "./Form";

const Contacts = () => {

  const dispatch = useDispatch();
  const allContacts = useSelector(allContactsSelector);

  useLayoutEffect(() => {
      dispatch(loadContacts());
  }, []);

  return (
    <section className="main">
      <div style={{marginTop: '2rem'}}><h1 style={{textAlign: 'center'}}>Dashboard</h1></div>
      <div className="container-even">
        <div>
          {/*Form*/}
          <Form/>
        </div>
        <div>
          {allContacts.length !== 0 ? allContacts.map(contact => <ContactItem key={contact._links.self.href}
                                                                              contact={contact}/>) : "Please add a contact ..."}
        </div>
      </div>
    </section>
  );
}

export default Contacts;