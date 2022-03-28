import React, { useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({
      email,
      password,
    });
    await signin(email, password);
    form.reset();
    navigate("/");
  };
  return (
    <div className="login create-account">
      <div className="wrapper">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit} className="create-account__form">
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
