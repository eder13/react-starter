import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ title: title }) => {
  return (
    <nav className="navbar bg-light">
      <h2>{title}</h2>
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
