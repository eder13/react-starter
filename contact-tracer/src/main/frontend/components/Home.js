import React, {Fragment, useLayoutEffect} from 'react';
import {useDispatch} from "react-redux";
import {loadLogin, loadLoginUserId} from "../store/auth/auth";

const Home = () => {

  // // Check if user is logged in (checks if calling endpoints produces 401)
  // const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   // load the username
  //   dispatch(loadLogin())
  //     .then((resolved) => {
  //       console.log("[auth]: user name call to endpoint succeeded.");
  //       if (resolved) {
  //         console.log("[auth]: user name successfully stored.");
  //         // load the userId
  //         dispatch(loadLoginUserId())
  //           .then((resolved) => {
  //             console.log("[auth]: user id call to endpoint succeeded.");
  //             if (resolved)
  //               console.log("[auth]: user id successfully stored.");
  //           })
  //           .catch(reason => console.error(reason));
  //       }
  //     })
  //     .catch(reason => console.error(reason));
  // }, []);

  // TODO: Notification + Loading Icon
  /*
  * let notification;
  if (loginState.loading) {
    return (
      <div className="loader-wrap">
        <div className="loader">{}</div>
      </div>
    );
  } else {
    if (loginState.notification.error !== "" || loginState.notification.type !== "") {
      if (loginState.notification.type === "error") {
        notification = (
          <Notification>
            <p>
              <i className="fas fa-info-circle"/>
              {" " + loginState.notification.error}
            </p>
          </Notification>
        );
      } else {
        notification = (
          <Notification info>
            <p>
              <i className="fas fa-info-circle"/>
              {" " + loginState.notification.error}
            </p>
          </Notification>
        );
      }
    } else {
      notification = "";
    }
  }
  *
  * {notification !== "" && <DivFlexedCenter>{notification}</DivFlexedCenter>}
  *
  * const Notification = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${props => props.info ? "#bce8f1" : "#f5c6cb"};
  background-color: ${props => props.info ? "#d9edf7" : "#f8d7da"};
  color: ${props => props.info ? "#31708f" : "#721c24"};
`;
  *
  * */

  return (
    <Fragment>
      <h1>Contact Tracer</h1>
      <p>Contact is a Application that allows you to ...</p>
    </Fragment>
  );
}

export default Home;