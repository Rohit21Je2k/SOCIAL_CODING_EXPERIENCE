import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../util/context/AuthContext";
import Logout from "../Logout/Logout";

import "./NavBarDesktop.css";

export default function NavBarDesktop() {
  const { token, user } = useContext(AuthContext);
  const [menuNum, setMenuNum] = useState(1);

  const handleClick = (num) => {
    return () => {
      setMenuNum(num);
    };
  };
  return (
    <div className="navbar-desktop">
      <Link
        to="/"
        onClick={handleClick(1)}
        className={`navbar-desktop__link ${menuNum === 1 ? "selected" : null}`}
      >
        Home
      </Link>
      <Link
        to="/search"
        onClick={handleClick(2)}
        className={`navbar-desktop__link ${menuNum === 2 ? "selected" : null}`}
      >
        Search
      </Link>
      <Link
        to="/leaderBoard"
        onClick={handleClick(4)}
        className={`navbar-desktop__link ${menuNum === 4 ? "selected" : null}`}
      >
        LeaderBoard
      </Link>
      {token && (
        <>
          <Link
            to={`/dashboard/${user.username}`}
            onClick={handleClick(3)}
            className={`navbar-desktop__link ${
              menuNum === 3 ? "selected" : null
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/follow"
            onClick={handleClick(5)}
            className={`navbar-desktop__link ${
              menuNum === 5 ? "selected" : null
            }`}
          >
            Follow
          </Link>
          <Link
            to="/groups"
            onClick={handleClick(6)}
            className={`navbar-desktop__link ${
              menuNum === 6 ? "selected" : null
            }`}
          >
            Groups
          </Link>
        </>
      )}

      {!token && (
        <>
          <Link
            to="/signup"
            onClick={handleClick(7)}
            className={`navbar-desktop__link ${
              menuNum === 7 ? "selected" : null
            }`}
          >
            Create Account
          </Link>
          <Link
            to="/login"
            onClick={handleClick(8)}
            className={`navbar-desktop__link ${
              menuNum === 8 ? "selected" : null
            }`}
          >
            Login
          </Link>
        </>
      )}

      {token && <Logout />}
    </div>
  );
}
