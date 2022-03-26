import React from "react";
import { Link } from "react-router-dom";

import "./NavBarDesktop.css";

export default function NavBarDesktop() {
  return (
    <div className="navbar-desktop">
      <Link to="/" className="navbar-desktop__link">
        Home
      </Link>
      <Link to="/dashboard" className="navbar-desktop__link">
        Dashboard
      </Link>
      <Link to="/leaderBoard" className="navbar-desktop__link">
        LeaderBoard
      </Link>
      <Link to="/friends" className="navbar-desktop__link">
        Friends
      </Link>
      <Link to="/signup" className="navbar-desktop__link">
        Create Account
      </Link>
      <Link to="/login" className="navbar-desktop__link">
        Login
      </Link>
    </div>
  );
}
