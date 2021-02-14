import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  addTask,
  bindNewTask,
  clearTmpTask,
  notificationSelector,
  tmpTaskSelector,
  updateTask
} from "../store/entities/reducers/task";
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

const Form = () => {

  // local form data state
  // TODO: taskForm
  const [taskForm, setTaskForm] = useState({
    localHref: '', // needed for updates
    localTitle: '',
    localDescription: '',
    localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`,
    localType: true,
  });

  // destructure data from input user
  const {localHref, localTitle, localDescription, localDate, localType} = taskForm;
  const dispatch = useDispatch();
  const tmpTask = useSelector(tmpTaskSelector); // specify selector to set/get data inside form when edit
  const notification = useSelector(notificationSelector); // specify ui messages if something fails

  const {href, title, description, date, workHome} = tmpTask;

  console.log(tmpTask);

  // whenever tmpTask changes set it to regarding the text fields (update state)
  useEffect(() => {

    console.log("useEffectForm triggered");


    if (href && title && description && date) //
      setTaskForm({
        localHref: href,
        localTitle: title,
        localDescription: description,
        localDate: `${new Date(Date.parse(date.toString())).getUTCFullYear()}-${(((parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1) : (parseInt(new Date(Date.parse(date.toString())).getMonth().toString()) + 1))}-${((parseInt(new Date(Date.parse(date.toString())).getDate().toString()) < 10) ? '0' + parseInt(new Date(Date.parse(date.toString())).getDate().toString()) : parseInt(new Date(Date.parse(date.toString())).getDate().toString()))}`,
        localType: workHome,
      })
    else // this specifies the case if the use is in edit mode and then deletes it anyways -> clear out local form as well
    {
      console.log("Here after set");

      setTaskForm({
        localHref: '',
        localTitle: '',
        localDescription: '',
        localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`,
        localType: true,
      });
    }
  }, [tmpTask]);

  const onChange = (e) => {
    if(e.target.id === "work" || e.target.id === "home") {
      if(e.target.id === "work")
        setTaskForm({...taskForm, localType: true}); // WORK
      else
        setTaskForm({...taskForm, localType: false});  // HOME
    } else {
      setTaskForm({...taskForm, [e.target.name]: e.target.value});
    }
  }

  // if user aborts update, reset local form and clear tmp in state
  const onDiscard = (e) => {

    // clear temp field in state
    dispatch(clearTmpTask());

    // clear input field
    setTaskForm({
      localHref: '',
      localTitle: '',
      localDescription: '',
      localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`,
      localType: true
    });
  }

  const onSubmit = async (e) => {

    e.preventDefault();

    // check if update-mode is on by checking if tmpTask is set
    if (href && title && description && date) {
      // Edit Mode
      dispatch(updateTask(href, localTitle, localDescription, localDate, localType));
    } else {
      // Add Mode
      // add the contact to our api/mysql generally
      try {
        const res = await dispatch(addTask(localTitle, localDescription, localDate, localType));
        if (res)
          await dispatch(bindNewTask());
      } catch (e) {
        console.log(e);
      }
    }

    // clear input fields
    setTaskForm({
      localHref: '',
      localTitle: '',
      localDescription: '',
      localDate: `${new Date((Date.now())).getUTCFullYear()}-${(((parseInt(new Date((Date.now())).getMonth().toString()) + 1) < 10) ? '0' + (parseInt(new Date((Date.now())).getMonth().toString()) + 1) : parseInt(new Date((Date.now())).getMonth().toString() + 1))}-${((parseInt(new Date((Date.now())).getDate().toString()) < 10) ? '0' + new Date((Date.now())).getDate() : new Date((Date.now())).getDate())}`,
      localType: true
    });
  }

  return (
    <form style={{width: '100%'}} onSubmit={onSubmit} name="contact">

      {(notification.type !== "" && notification.error !== "") &&
      <div className={notification.type}>
        <p>
          <i className="fas fa-info-circle"/>
          {" " + notification.error}
        </p>
      </div>
      }

      {/*invisible id with id href*/}
      <div className="padding-05y">
        <input style={{display: 'none'}} className="full-width" type="text" name="localHref" value={localHref}
               onChange={onChange}/>
      </div>

      <div className="padding-05y">
        <label htmlFor="localTitle">title:</label>
        <input className="full-width" type="text" id="localTitle" name="localTitle" value={localTitle}
               onChange={onChange}/>
      </div>

      <div className="padding-05y">
        <label htmlFor="localDescription">description:</label>
        <input className="full-width" type="text" id="localDescription" name="localDescription" value={localDescription}
               onChange={onChange}/>
      </div>

      <div className="padding-05y">
        <label htmlFor="localDate">date:</label>
        <input className="full-width" type="date" id="localDate" name="localDate"
               value={localDate}
               onChange={onChange}/>
      </div>

      <div className="padding-05y">
        Work: <input type="radio" id="work" name="localType" onChange={onChange} /> &nbsp;
        Home: <input id="home" type="radio" name="localType" onChange={onChange} />
      </div>

      {/*Submit*/}
      <div className="padding-1y">
        {/*check if tmp fields are set -> if so we are in update mode*/}
        {(href && title && description && date) ?
          <ButtonWarning type="submit">Update</ButtonWarning> :
          <ButtonPrimary type="submit">Add</ButtonPrimary>}
        {(href && title && description && date) &&
        <ButtonDanger onClick={onDiscard}>Discard</ButtonDanger>}
      </div>
    </form>
  );
}

export default Form;