import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title: title }) => {
  return (
    <nav className="navbar bg-light">
      <h2>{title}</h2>
      <ul>
        <li>
          <Link style={{ color: "black" }} to="/">
            Home
          </Link>
          <Link style={{ color: "black" }} to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "You forget Add Props..",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
