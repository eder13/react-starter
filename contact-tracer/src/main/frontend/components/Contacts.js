import React, {Fragment, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allContactsSelector, loadContacts} from "../store/entities/reducers/contact";
import ContactItem from "./ContactItem";

const Contacts = ({userId}) => {

  const dispatch = useDispatch();
  const allContacts = useSelector(allContactsSelector);

  useLayoutEffect(() => {

    // TODO: Investigate how useSelector done before this call
    // e.g. const userId = useSelector(loginUserIdSelector);

    if (userId)
      dispatch(loadContacts(userId));

  }, []);

  return (
    <Fragment>
      <div style={{marginTop: '2rem'}}><h1 style={{textAlign: 'center'}}>Dashboard</h1></div>
      {/*{allContacts.map(contact => <div>{contact.firstName}</div>)}*/}
      <div className="container-even">
        <div>
        {/*Form*/}
        </div>
        <div>
          {allContacts.map(contact => <ContactItem key={contact._links.self.href} contact={contact}/>)}
        </div>
      </div>
    </Fragment>
  );
}

export default Contacts;