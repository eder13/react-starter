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

const Round = styled.span`
  background-color: coral;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
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
          <CardTop>
            <Round>{++index}</Round>
          </CardTop>
          {/*Card Content*/}
          <Ul>
            <li style={{display: 'none'}} id={_links.self.href}>{}</li>
            <li><i className="fas fa-hands-wash">&nbsp;</i>{`${dateParsed.getDate()}.${dateParsed.getMonth() + 1}.${dateParsed.getUTCFullYear()}`}
            </li>
            <li><i className="fas fa-user">&nbsp;</i>{firstName}&nbsp;<strong>{lastName}</strong></li>
            <li><i className="fas fa-envelope">&nbsp;</i>{email}</li>
          </Ul>
          <CardBottom>
            <button className="edit" onClick={setEditForm}>edit</button>
            <button className="delete" onClick={deleteEntry}>delete</button>
          </CardBottom>
        </Card>
      </ContainerCard>
    </Fragment>
  );
}

export default ContactItem;