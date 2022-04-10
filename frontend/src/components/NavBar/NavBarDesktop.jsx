import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../util/context/AuthContext";
import Logout from "../Logout/Logout";

import "./NavBarDesktop.css";

export default function NavBarDesktop() {
  const { token, user } = useContext(AuthContext);
  return (
    <div className="navbar-desktop">
      <Link to="/" className="navbar-desktop__link">
        Home
      </Link>
      <Link to="/search" className="navbar-desktop__link">
        Search
      </Link>
      {token && (
        <>
          <Link
            to={`/dashboard/${user.email}`}
            className="navbar-desktop__link"
          >
            Dashboard
          </Link>
          <Link to="/leaderBoard" className="navbar-desktop__link">
            LeaderBoard
          </Link>
          <Link to="/friends" className="navbar-desktop__link">
            Friends
          </Link>
        </>
      )}

      {!token && (
        <>
          <Link to="/signup" className="navbar-desktop__link">
            Create Account
          </Link>
          <Link to="/login" className="navbar-desktop__link">
            Login
          </Link>
        </>
      )}

      {token && <Logout />}
    </div>
  );
}
