import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import person from "../../assets/person.png";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import search from "../../util/api/search";
import "./Search.css";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShow(true);
    const username = e.target.username.value;
    const data = await search(username);
    setUser(data?.username);
    setLoading(false);
  };

  return (
    <div className="search">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Enter Username"
            type="text"
            name="username"
            placeholder="Enter username..."
          />
          <button>Submit</button>
        </form>
        {loading ? (
          <Loader />
        ) : (
          show &&
          (user ? (
            <div className="follow_card">
              <span>
                <img src={person} />
              </span>
              <h3>{user}</h3>
              <Link className="btn" to={`/dashboard/${user}`}>
                View Profile
              </Link>
            </div>
          ) : (
            <h2>No User found</h2>
          ))
        )}
      </div>
    </div>
  );
}
