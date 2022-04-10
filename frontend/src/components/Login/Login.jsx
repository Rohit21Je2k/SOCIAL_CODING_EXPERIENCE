import React, { useState, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({
      email,
      password,
    });
    await signin(email, password);
    form.reset();
    setLoading(false);
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
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password here"
            autoComplete="off"
            required
          />
          <button type="submit">Submit</button>
          {loading && <p className="load-text">Submitting...</p>}
          <Link className="p" to="/signup">
            or, Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
}
