import React, {Fragment} from 'react';

const ContactItem = ({contact}) => {

  const date = new Date(Date.parse(contact.date.toString()))

  return (
    <Fragment>
      <div className="container-card">
        <div className="card">
          <div className="card-top" id="date-top">
            <h3>Date of Contact: {`${date.getDate()}.${date.getMonth()+1}.${date.getUTCFullYear()}`}</h3>
          </div>
          <div className="card-content">
            <ul>
              <li style={{display: 'none'}} id={contact._links.self.href}>{}</li>
              <li>First name: {contact.firstName}</li>
              <li>Last name: {contact.lastName}</li>
              <li>E-Mail: {contact.email}</li>
            </ul>
          </div>
          <div className="card-bottom">
            <p>Actions: <button>edit</button>{"   "}<button>delete</button></p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactItem;