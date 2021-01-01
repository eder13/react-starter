import React from 'react';
import PropTypes from 'prop-types';

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

function Navbar(props) {
  return (
    <section id="navbar">
      <div className="logo">
        <i className={props.title + " fa-3x"}/>
      </div>
      <nav className="navbar-nav">
        <ul>
          <li>{props.user}</li>
        </ul>
      </nav>
    </section>
  );
}

export default Navbar;