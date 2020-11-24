import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    // update state, what's in here
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });

    e.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            name="text"
            value={this.state.text}
            type="text"
            placeholder="search users.."
            onChange={this.onChange}
          />
          <input
            type="submit"
            className="btn btn-dark btn-block"
            value="Search"
          />
        </form>
      </div>
    );
  }
}

export default Search;
