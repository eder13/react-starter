import "./App.css";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }); // destructuring, pulling out loading from state

    const req = await axios.get(
      "https://api.github.com/users?client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a"
    );

    this.setState({ loading: false, users: req.data });
  }

  render() {
    return (
      <Fragment>
        <Navbar title="Github Finder" />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </Fragment>
    );
  }
}

export default App;

// https://api.github.com/users/${name}?client_id=${this._clientId}&client_secret=${this._clientSecret}`;

// clientId: af67235771058324e4aa
// clientSecret: 08752555d44caf5ba4d2ab0c47b06c908e70373a

// E.g. https://api.github.com/users/eder13?client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a
// To get a user profile
