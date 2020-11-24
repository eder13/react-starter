import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    if (this.state.text === "") {
      this.props.setAlert("Enter Something...", "alert alert-danger");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }

    e.preventDefault();
  };

  render() {
    const { showClear, clearUser } = this.props;

    return (
      <div>
        <form
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
          }}
          onSubmit={this.onSubmit}
          className="form"
        >
          <input
            name="text"
            value={this.state.text}
            type="text"
            placeholder="search users.."
            onChange={this.onChange}
          />
          <input type="submit" className="btn btn-dark" value="Search" />
          {showClear && (
            <button className="btn btn-light" onClick={clearUser}>
              clear
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
