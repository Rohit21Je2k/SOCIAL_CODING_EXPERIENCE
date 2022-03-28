import React, { useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Logout.css";

export default function Logout() {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    signout();
    navigate("/");
  };
  return (
    <button onClick={handleClick} className="logout-btn">
      Logout
    </button>
  );
}
