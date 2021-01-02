import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadLogout} from "../store/auth/auth";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

function Navbar(props) {
  const dispatch = useDispatch();

  return (
    <section id="navbar">
      <div className="logo">
        <Link to="/"><i style={{color: 'red'}} className={props.title + " fa-3x"}/></Link>
      </div>
      <nav className="navbar-nav">
        <ul>
          <li>{props.user}</li>
          <li><Link to="/">Home</Link></li>
          <li>{props.dash}</li>
          <li>{props.logout && <button onClick={(e) => dispatch(loadLogout())}>logout</button>}</li>
        </ul>
      </nav>
    </section>
  );
}

export default Navbar;