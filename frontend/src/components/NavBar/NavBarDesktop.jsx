import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../util/context/AuthContext";
import Logout from "../Logout/Logout";

import "./NavBarDesktop.css";

export default function NavBarDesktop() {
  const route = useLocation().pathname.split("/")[1];

  const { token, user } = useContext(AuthContext);
  const [menuNum, setMenuNum] = useState(1);

  useEffect(() => {
    switch (route) {
      case "":
        setMenuNum(1);
        break;
      case "search":
        setMenuNum(2);
        break;
      case "leaderboard":
        setMenuNum(3);
        break;
      case "dashboard":
        setMenuNum(4);
        break;
      case "follow":
        setMenuNum(5);
        break;
      case "groups":
        setMenuNum(6);
        break;
      case "signup":
        setMenuNum(7);
        break;
      case "login":
        setMenuNum(8);
        break;
      default:
        setMenuNum(1);
    }
  }, [route]);

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
        to="/leaderboard"
        onClick={handleClick(3)}
        className={`navbar-desktop__link ${menuNum === 3 ? "selected" : null}`}
      >
        LeaderBoard
      </Link>
      {token && (
        <>
          <Link
            to={`/dashboard/${user.username}`}
            onClick={handleClick(4)}
            className={`navbar-desktop__link ${
              menuNum === 4 ? "selected" : null
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
