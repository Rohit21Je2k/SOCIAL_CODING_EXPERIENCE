import React from "react";
import { Link } from "react-router-dom";
import Input from "../../ui/Input/Input";

import "./CreateAccount.css";

export default function CreateAccount() {
  return (
    <div className="create-account">
      <div className="wrapper">
        <h2>Create New Account</h2>
        <form className="create-account__form">
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
            name="codeForcesID"
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
