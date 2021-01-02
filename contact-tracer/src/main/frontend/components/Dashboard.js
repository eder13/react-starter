import React, {Fragment, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadContacts} from "../store/entities/reducers/contact";
import {loginUserIdSelector} from "../store/auth/auth";


function Dashboard() {

  const dispatch = useDispatch();

  //console.log("userId: ", userId);

  useLayoutEffect(() => {

    // TODO: Investigate how useSelector done before this call
    //const userId = useSelector(loginUserIdSelector);
    dispatch(loadContacts(1));

  }, []);

  return (
    <Fragment>
      <div style={{marginTop: '2rem'}}><h1 style={{textAlign: 'center'}}>Dashboard</h1></div>
    </Fragment>
  );
}

export default Dashboard;