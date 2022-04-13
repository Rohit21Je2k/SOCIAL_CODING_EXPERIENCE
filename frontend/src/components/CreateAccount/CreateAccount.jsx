import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";
import { AuthContext } from "../../util/context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./CreateAccount.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const password = form.password.value;
    const githubID = form.githubID.value;
    const leetcodeID = form.leetcodeID.value;
    const codechefID = form.codechefID.value;
    console.log({
      name,
      username,
      password,
      githubID,
      leetcodeID,
      codechefID,
    });

    const res = await signup(
      name,
      username,
      password,
      githubID,
      leetcodeID,
      codechefID
    );
    form.reset();
    setLoading(false);
    if (res) {
      navigate("/");
    }
  };
  return (
    <div className="create-account">
      <div className="wrapper">
        <h2>Create New Account</h2>
        <form onSubmit={handleFormSubmit} className="create-account__form">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter Name here"
            required
          />
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Enter Username here"
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
          <Input
            label="Github Username"
            type="text"
            name="githubID"
            placeholder="Enter Github username here"
            required
          />
          <Input
            label="LeetCode Username"
            type="text"
            name="leetcodeID"
            placeholder="Enter LeetCode username here"
            required
          />
          <Input
            label="CodeChef Username"
            type="text"
            name="codechefID"
            placeholder="Enter CodeChef username here"
            required
          />
          <button type="submit">Submit</button>
          {loading && <p className="load-text">Submitting...</p>}
          <Link className="p" to="/login">
            or, Login
          </Link>
        </form>
      </div>
    </div>
  );
}
