import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  const [text, setText] = useState("");

  const { showClear, clearUser } = props;

  const onSubmit = (e) => {
    if (text === "") {
      // if (state.text === "") {
      props.setAlert("Enter Something...", "alert alert-danger");
    } else {
      props.searchUsers(text); // props.searchUsers(state.text);
      setText(""); //setState({ text: "" });
    }

    e.preventDefault();
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
        }}
        onSubmit={onSubmit} // onChange={this.onSubmit}
        className="form"
      >
        <input
          name="text"
          value={text} //value={state.text}
          type="text"
          placeholder="search users.."
          onChange={onChange} // onChange={this.onChange}
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
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;