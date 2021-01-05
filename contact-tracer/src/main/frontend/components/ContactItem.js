import React, {Fragment} from 'react';
import {useDispatch} from "react-redux";
import {clearTmpContact, setTmpContact, deleteContact} from "../store/entities/reducers/contact";

const ContactItem = ({contact}) => {

  const {firstName, lastName, email, date, _links} = contact;

  const dispatch = useDispatch();
  const dateParsed = new Date(Date.parse(date.toString()))
  //const tmpContact = useSelector(tmpContactSelector);

  const deleteEntry = (e) => {
    dispatch(deleteContact(_links.self.href));
  }

  const setEditForm = (e) => {

    // clear previous stuff
    dispatch(clearTmpContact());

    // set tmp contact when clicked
    dispatch(setTmpContact(_links.self.href, firstName, lastName, email, date));

  }

  return (
    <Fragment>
      <div className="container-card">
        <div className="card">
          <div className="card-top" id="date-top">
            <h3>Date of
              Contact: {`${dateParsed.getDate()}.${dateParsed.getMonth() + 1}.${dateParsed.getUTCFullYear()}`}</h3>
          </div>
          <div className="card-content">
            <ul>
              <li style={{display: 'none'}} id={_links.self.href}>{}</li>
              <li>First name: {firstName}</li>
              <li>Last name: {lastName}</li>
              <li>E-Mail: {email}</li>
            </ul>
          </div>
          <div className="card-bottom">
            <p>
              <button className="edit" onClick={setEditForm}>edit</button>{"   "}
              <button className="delete" onClick={deleteEntry}>delete</button>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactItem;