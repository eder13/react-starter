import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  addContact, // addTask
  bindNewContact, // bindNewTask
  clearTmpContact, // clearTmpTask
  notificationSelector,
  tmpContactSelector, // tmpTaskSelector
  updateContact // updateTask
} from "../store/entities/reducers/contact"; // "../store/entities/reducers/task"
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
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  width: 100%;
`;

const ButtonPrimary = styled(Button)`
  background-color: transparent; 
  height: 38px; 
  margin: 0.5rem 0rem;
`;

const ButtonDanger = styled(Button)`
  background-color: rgb(240, 0, 57); 
  height: 38px; 
  margin: 0.5rem 0rem;
`;

const ButtonWarning = styled(Button)`
  background-color: rgb(255, 194, 0); 
  height: 38px; 
  margin: 0.5rem 0rem;
`;

const SubStringPrimary = (props) => {
  return <ButtonPrimary {...props} children={props.children.substr(5, 9)}/>;
};

const Form = () => {

  // local form data state
  // TODO: taskForm
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
  const tmpContact = useSelector(tmpContactSelector);// TODO // specify selector to set/get data inside form when edit
  const notification = useSelector(notificationSelector); // specify ui messages if something fails
  const {type, error} = notification;

  const {href, firstName, lastName, email, date} = tmpContact; // TODO
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
    setContactForm({...contactForm, [e.target.name]: e.target.value}); // TODO
  }

  const onDiscard = (e) => {
    // clear temp field in state
    dispatch(clearTmpContact()); // TODO
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

    // check if update-mode is on (-> tmp fields are set)
    if (href && firstName && lastName && email && date) {
      // Edit Mode
      dispatch(updateContact(href, localFirstName, localLastName, localEmail, localDate)); // TODO
    } else {
      // Add Mode
      // add the contact to our api/mysql generally
      try {
        const res = await dispatch(addContact(localFirstName, localLastName, localEmail, localDate)); // TODO
        if (res)
          await dispatch(bindNewContact()); // TODO
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
    <form style={{width: '100%'}} onSubmit={onSubmit} name="contact">

      {(type !== "" && error !== "") &&
      <div className={type}>
        <p>
          <i className="fas fa-info-circle"/>
          {" " + error}
        </p>
      </div>
      }

      {/*invisible id with id href*/}
      <div className="padding-05y">
        <input style={{display: 'none'}} className="full-width" type="text" name="localHref" value={localHref}
               onChange={onChange}/>
      </div>

      <div className="padding-05y">
        <label htmlFor="localFirstName">title:</label>
        <input className="full-width" type="text" id="localFirstName" name="localFirstName" value={localFirstName}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localLastName">description:</label>
        <input className="full-width" type="text" id="localLastName" name="localLastName" value={localLastName}
               onChange={onChange}/>
      </div>
      <div className="padding-05y">
        <label htmlFor="localDate">date:</label>
        <input className="full-width" type="date" id="localDate" name="localDate"
               value={localDate}
               onChange={onChange}/>
      </div>

      {/*Submit*/}
      <div className="padding-1y">
        {(href && firstName && lastName && email && date) ?
          <ButtonWarning type="submit">Update</ButtonWarning> :
          <ButtonPrimary type="submit">Add</ButtonPrimary>}
        {(href && firstName && lastName && email && date) &&
        <ButtonDanger onClick={onDiscard}>Discard</ButtonDanger>}
      </div>
    </form>
  );
}

export default Form;