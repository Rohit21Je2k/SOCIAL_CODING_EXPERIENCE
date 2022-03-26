import React from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

import logo from "../../assets/navbar_logo.png";

import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* logo */}
        <span className="navbar-logo">
          <img src={logo} alt="logo" />
        </span>

        {/* desktop menu */}
        <NavBarDesktop />

        {/* mobile menu */}
        {/* <NavBarMobile /> */}
      </div>
    </div>
  );
}
