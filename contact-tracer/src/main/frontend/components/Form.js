import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addContact, bindNewContact, tmpContactSelector} from "../store/entities/reducers/contact";

const Form = () => {

  // local form data state
  const [contactForm, setContactForm] = useState({
    localHref: '',
    localFirstName: '',
    localLastName: '',
    localEmail: '',
    // transform input field with type=date to yyyy-mm-dd
    localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`
  });

  // pull out data from parent object state
  const {localHref, localFirstName, localLastName, localEmail, localDate} = contactForm;
  const dispatch = useDispatch();
  const tmpContact = useSelector(tmpContactSelector); // specify selector

  const onChange = (e) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Validation before dispatching with contactAdded

    // add the contact to our api/mysql generally
    dispatch(addContact(localFirstName, localLastName, localEmail, localDate))
      // set relation to currently logged in user
      .then(() => dispatch(bindNewContact()));

    // clear input fields
    setContactForm({
      localHref: '',
      localFirstName: '',
      localLastName: '',
      localEmail: '',
      localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`
    });
  }

  useEffect(() => {
    const {href, firstName, lastName, email, date} = tmpContact;

    if (href && firstName && lastName && email && date) // exist check - could also be empty (cleared)
      setContactForm({
        localHref: href,
        localFirstName: firstName,
        localLastName: lastName,
        localEmail: email,
        localDate: `${new Date(Date.parse(date.toString())).getUTCFullYear()}-${(((parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) : (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1))}-${((parseInt(new Date(Date.parse(date.toString())).getDate().toString()) < 10) ? '0' + parseInt(new Date(Date.parse(date.toString())).getDate().toString()) : parseInt(new Date(Date.parse(date.toString())).getDate().toString()))}`
      })
  }, [tmpContact]);

  return (
    <form onSubmit={onSubmit} className="padding-1y" name="contact">
      <h1>Form</h1>

      <div className="padding-05y">
        <input style={{display: 'none'}} className="full-width" type="text" name="localHref" value={localHref}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localFirstName">First name:</label>
        <input className="full-width" type="text" id="localFirstName" name="localFirstName" value={localFirstName}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localLastName">Last name:</label>
        <input className="full-width" type="text" id="localLastName" name="localLastName" value={localLastName}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localEmail">E-Mail:</label>
        <input className="full-width" type="email" id="localEmail" name="localEmail" value={localEmail}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localDate">Date:</label>
        <input className="full-width" type="date" id="localDate" name="localDate" /// TODO Regex Date
          // value={`${new Date(Date.parse(localDate.toString())).getUTCFullYear()}-${((new Date(Date.parse(localDate.toString())).getMonth() + 1 < 10) ? '0' + new Date(Date.parse(localDate.toString())).getMonth() + 1 : new Date(Date.parse(localDate.toString())).getMonth() + 1)}-${((new Date(Date.parse(localDate.toString())).getDate() < 10) ? '0' + new Date(Date.parse(localDate.toString())).getDate() : new Date(Date.parse(localDate.toString())).getDate())}`}
               value={localDate}
               onChange={onChange}/>
      </div>
      <div className="padding-1y">
        <input id="form-submit" type="submit" className="full-width" value="Submit"/>
      </div>
    </form>
  );
}

export default Form;