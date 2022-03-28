import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";
import { AuthContext } from "../../util/context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./CreateAccount.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const githubID = form.githubID.value;
    const leetcodeID = form.leetcodeID.value;
    const codechefID = form.codechefID.value;
    console.log({
      name,
      email,
      password,
      githubID,
      leetcodeID,
      codechefID,
    });

    await signup(name, email, password, githubID, leetcodeID, codechefID);
    form.reset();
    navigate("/");
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
          />
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
          <Input
            label="Github Username"
            type="text"
            name="githubID"
            placeholder="Enter Github username here"
          />
          <Input
            label="LeetCode Username"
            type="text"
            name="leetcodeID"
            placeholder="Enter LeetCode username here"
          />
          <Input
            label="CodeChef Username"
            type="text"
            name="codechefID"
            placeholder="Enter CodeChef username here"
          />
          <button type="submit">Submit</button>
          <Link className="p" to="/login">
            or, Login
          </Link>
        </form>
      </div>
    </div>
  );
}
