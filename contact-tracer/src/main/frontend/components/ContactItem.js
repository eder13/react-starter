import React, {Fragment} from 'react';
import {useDispatch} from "react-redux";
import {clearTmpContact, deleteContact, setTmpContact} from "../store/entities/reducers/contact";
import styled from "styled-components";

// Styled Components
const ContainerCard = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Card = styled.div`
  width: 100%;
  margin: 50px auto 50px auto;
  display: grid;
  grid-template-rows: 50px auto 50px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
  background-color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CardTop = styled.div`
  text-align: center;
  color: white;
  background-color: #333;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-flow: column nowrap;
  height: 70px;
  min-width: 300px;
  justify-content: space-evenly;
  padding: 0 1rem;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #eeeeee;
`;

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
  ${props => props.primary && "background-color: transparent; height: 38px; margin: 0.5rem 0rem;"};
  ${props => props.secondary && "color: #000; background-color: rgb(248, 249, 250); border-color: #ff974c; padding-top: 0.25rem; padding-bottom: 0.25rem;"};
  ${props => props.danger && "background-color: rgb(240, 0, 57); height: 38px; margin: 0.5rem 0rem;"}; 
  ${props => props.warning && "background-color: rgb(255, 194, 0); height: 38px; margin: 0.5rem 0rem;"};  
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  width: 100%;
`;

const ContactItem = ({contact, index}) => {

  const {firstName, lastName, email, date, _links} = contact;

  const dispatch = useDispatch();
  const dateParsed = new Date(Date.parse(date.toString()))

  const deleteEntry = (e) => {
    dispatch(deleteContact(_links.self.href));
    dispatch(clearTmpContact());
  }

  const setEditForm = (e) => {

    // clear previous stuff
    dispatch(clearTmpContact());

    // set tmp contact when clicked
    dispatch(setTmpContact(_links.self.href, firstName, lastName, email, date));

  }

  return (
    <Fragment>
      <ContainerCard>
        <Card>
          <CardTop />
          <Ul>
            <li style={{display: 'none'}} id={_links.self.href}>{}</li>
            <li><i className="fas fa-hands-wash">&nbsp;</i>{`${dateParsed.getDate()}.${dateParsed.getMonth() + 1}.${dateParsed.getUTCFullYear()}`}
            </li>
            <li><i className="fas fa-user">&nbsp;</i>{firstName}&nbsp;<strong>{lastName}</strong></li>
            <li><i className="fas fa-envelope">&nbsp;</i>{email}</li>
          </Ul>
          <CardBottom>
            <Button secondary onClick={setEditForm}>edit</Button>
            <Button secondary style={{backgroundColor: 'red'}} onClick={deleteEntry}>delete</Button>
          </CardBottom>
        </Card>
      </ContainerCard>
    </Fragment>
  );
}

export default ContactItem;