import React, { useEffect, Fragment } from "react";
import Spinner from "./../layout/Spinner";
import ProptTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "./../repos/Repos";

const User = ({
  user,
  loading,
  repos,
  getSingleGithubUser,
  getUserRepos,
  match,
}) => {
  useEffect(() => {
    getSingleGithubUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  // github response, pull out that data -> e.g. https://api.github.com/users/eder13
  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  if (loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <div className="card text-center">
        <h3>
          {name} aka {login}
        </h3>
        <img
          src={avatar_url}
          style={{ width: "200px", borderRadius: "50%" }}
          alt=""
        />
        <p>{bio}</p>
        <ul>
          <li>{location}</li>
          <li>Repos: {public_repos}</li>
          <li>Gists: {public_gists}</li>
          <li>Followers: {followers}</li>
          <li>Following: {following}</li>
        </ul>

        <a href={html_url}>Go to Profile</a>
        <br />

        <Repos repos={repos} />

        <Link to="/" className="btn btn-light">
          Back
        </Link>
      </div>
    );
  }
};

User.propTypes = {
  loading: ProptTypes.bool.isRequired,
  user: ProptTypes.object.isRequired,
  repos: ProptTypes.array.isRequired,
  getSingleGithubUser: ProptTypes.func.isRequired,
  getUserRepos: ProptTypes.func.isRequired,
};

export default User;
