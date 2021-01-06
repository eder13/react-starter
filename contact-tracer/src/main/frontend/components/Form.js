import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  addContact,
  bindNewContact,
  clearTmpContact,
  notificationSelector,
  tmpContactSelector,
  updateContact
} from "../store/entities/reducers/contact";

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
  const tmpContact = useSelector(tmpContactSelector); // specify selector to set/get data inside form when edit
  const notification = useSelector(notificationSelector); // specify ui messages if something fails
  const {type, error} = notification;

  const {href, firstName, lastName, email, date} = tmpContact;
  useEffect(() => {
    if (href && firstName && lastName && email && date) // exist check - could also be empty (cleared)
      setContactForm({
        localHref: href,
        localFirstName: firstName,
        localLastName: lastName,
        localEmail: email,
        localDate: `${new Date(Date.parse(date.toString())).getUTCFullYear()}-${(((parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) : (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1))}-${((parseInt(new Date(Date.parse(date.toString())).getDate().toString()) < 10) ? '0' + parseInt(new Date(Date.parse(date.toString())).getDate().toString()) : parseInt(new Date(Date.parse(date.toString())).getDate().toString()))}`
      })
    else // this specifies the case if the use is in edit mode and then deletes it anyways -> clear out local form as well
      setContactForm({
        localHref: '',
        localFirstName: '',
        localLastName: '',
        localEmail: '',
        localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`
      });
  }, [tmpContact]);

  const onChange = (e) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value});
  }

  const onDiscard = (e) => {
    // clear temp field in state
    dispatch(clearTmpContact());
    // clear input field
    setContactForm({
      localHref: '',
      localFirstName: '',
      localLastName: '',
      localEmail: '',
      localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`
    });
  }

  const onSubmit = async (e) => {

    e.preventDefault();
    // TODO: Validation before dispatching with contactAdded
    // check if update-mode is on
    if (href && firstName && lastName && email && date) {
      // Edit Mode
      dispatch(updateContact(href, localFirstName, localLastName, localEmail, localDate));
    } else {
      // Add Mode
      // add the contact to our api/mysql generally
      try {
        const res = await dispatch(addContact(localFirstName, localLastName, localEmail, localDate));
        if (res)
          await dispatch(bindNewContact());
      } catch (e) {
        console.log(e);
      }
    }

    // clear input fields
    setContactForm({
      localHref: '',
      localFirstName: '',
      localLastName: '',
      localEmail: '',
      localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`
    });
  }

  return (
    <form onSubmit={onSubmit} className="padding-1y" name="contact">
      {(href && firstName && lastName && email && date) ? <h1>Update Data</h1> : <h1>Add Data</h1>}

      {(type !== "" && error !== "") &&
      <div className={type}>
        <p>
          <i className="fas fa-info-circle"/>
          {" " + error}
        </p>
      </div>
      }

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
        {(href && firstName && lastName && email && date) ?
          <input id="form-submit" type="submit" style={{backgroundColor: 'orange', marginBottom: '1rem'}}
                 className="full-width" value="Update"/> :
          <input id="form-submit" type="submit" className="full-width" value="Add"/>}
        {(href && firstName && lastName && email && date) &&
        <input id="form-submit" style={{backgroundColor: 'red'}} type="button" onClick={onDiscard}
               className="full-width" value="Discard"/>}
      </div>
    </form>
  );
}

export default Form;