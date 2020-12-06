import "./App.css";
import React, { useState, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/layout/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  const search = async (queryString) => {
    setLoading(true);

    const req = await axios.get(
      `https://api.github.com/search/users?q=${queryString}&client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a`
    );

    setUsers(req.data.items);
    setLoading(false);
  };

  const getSingleGithubUser = async (user) => {
    setLoading(true);

    const req = await axios.get(
      `https://api.github.com/users/${user}?client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a`
    );

    setUser(req.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);

    const req = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=af67235771058324e4aa&client_secret=08752555d44caf5ba4d2ab0c47b06c908e70373a`
    );

    setRepos(req.data);
    setLoading(false);
  };

  const clear = () => {
    setUsers([]);
    setLoading(false);
  };

  const setErrorAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Router>
      <Navbar title="Github Finder" />
      <div className="container">
        {alert != null && (
          <div className={alert.type + " text-center"}>{alert.msg}</div>
        )}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search
                  clearUser={clear}
                  searchUsers={search}
                  showClear={users.length > 0 ? true : false}
                  setAlert={setErrorAlert}
                />
                <div className="container">
                  <Users loading={loading} users={users} />
                </div>
              </Fragment>
            )}
          ></Route>
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                getSingleGithubUser={getSingleGithubUser}
                getUserRepos={getUserRepos}
                repos={repos}
                user={user}
                loading={loading}
              />
            )}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;