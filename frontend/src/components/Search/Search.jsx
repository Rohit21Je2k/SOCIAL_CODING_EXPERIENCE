import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import person from "../../assets/person.png";
import { Link } from "react-router-dom";
import apiUrl from "../../api";

import "./Search.css";

export default function Search() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const user = await getUser(email);
    setUser(user);
    setShow(true);
  };

  return (
    <div className="search">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Enter User Email"
            type="email"
            name="email"
            placeholder="Enter user email..."
          />
          <button>Submit</button>
        </form>
        {show &&
          (user ? (
            <div className="friend_card">
              <span>
                <img src={person} />
              </span>
              <h3>{user.name}</h3>
              <Link className="btn" to={`/user/${user.email}`}>
                View Profile
              </Link>
            </div>
          ) : (
            <h2>No User found</h2>
          ))}
      </div>
    </div>
  );
}

async function getUser(email) {
  try {
    const response = await fetch(apiUrl + "/api/users/", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
