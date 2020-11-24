import "./App.css";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/layout/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  search = async (queryString) => {
    this.setState({ loading: true });

    const req = await axios.get(
      `https://api.github.com/search/users?q=${queryString}&client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a`
    );

    this.setState({ users: req.data.items });
    this.setState({ loading: false });
  };

  clear = () => {
    this.setState({ users: [], loading: false });
  };

  alert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    const self = this;
    setTimeout(() => {
      self.setState({ alert: null });
    }, 3000);
  };

  // async componentDidMount() {
  //   this.setState({ loading: true }); // destructuring, pulling out loading from state

  //   const req = await axios.get(
  //     "https://api.github.com/users?client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a"
  //   );

  //   this.setState({ loading: false, users: req.data });
  // }

  render() {
    const { users, loading } = this.state;

    return (
      <Router>
        <Navbar title="Github Finder" />
        <div className="container">
          {this.state.alert != null && (
            <div className={this.state.alert.type + " text-center"}>
              {this.state.alert.msg}
            </div>
          )}
          <Search
            clearUser={this.clear}
            searchUsers={this.search}
            showClear={users.length > 0 ? true : false}
            setAlert={this.alert}
          />
          <div className="container">
            <Users loading={loading} users={users} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// https://api.github.com/users/${name}?client_id=${this._clientId}&client_secret=${this._clientSecret}`;

// clientId: af67235771058324e4aa
// clientSecret: 08752555d44caf5ba4d2ab0c47b06c908e70373a

// E.g. https://api.github.com/users/eder13?client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a
// To get a user profile
