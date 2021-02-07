import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {loadingBooleanSelector} from "../store/auth/auth";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBox = styled.div`
  display: flex;
  justify-content: center;
  & > i {
    animation: ${animate} 1s linear infinite;
  }
`;

// axios config for csrf protection
axios.interceptors.request.use((req) => {

  if (
    req.method === "post" ||
    req.method === "delete" ||
    req.method === "put" ||
    req.method === "patch"
  ) {
    // check if relative to url only
    if (!(/^http:.*/.test(req.url) || /^https:.*/.test(req.url))) {
      req.headers.common = {
        ...req.headers.common,
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      };
    }
  }

  return req;
});

const Home = () => {

  // login Loading: Let firstly dispatch everything and see if user is still logged in
  const loading = useSelector(loadingBooleanSelector);


  const get = async () => {
    // const req = await axios.put("/api/contacts/3", {
    //   firstName: 'Sami',
    //   lastName: 'Smith',
    //   email: 'sis@mail.com',
    //   date: '2021-01-03',
    // }, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

    const req = await axios.delete("/api/contacts/3");

    // const req = await axios.put("/api/contacts/16/user", "/api/users/1", {
    //   headers: {
    //     "Content-Type": "text/uri-list"
    //   }
    // });

    console.log(req.status, req.statusText, req.data);
  }


  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>);
  } else {
    return (
      <Fragment>
        <h1>Contact Tracer</h1>
        <p>Contact is a Application that allows you to document your latest contacts.</p>
        <p>I was too lazy to style the front page, so here is a spinning cat instead:</p>
        <SpinningBox><i className="fas fa-cat fa-3x"></i></SpinningBox>

        <button onClick={get}>POST</button>

      </Fragment>
    );
  }
}

export default Home;