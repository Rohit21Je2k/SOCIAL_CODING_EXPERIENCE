import React from "react";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";

import "./Login.css";

export default function Login() {
  return (
    <div className="login create-account">
      <div className="wrapper">
        <h2>Login</h2>
        <form className="create-account__form">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter Email here"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password here"
          />
          <button type="submit">Submit</button>
          <Link className="p" to="/signup">
            or, Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
}
