import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../util/context/AuthContext";
import Loader from "../components/Loader/Loader";
import FriendCard from "./FriendCard";
import apiUrl from "../api";

import "./Friends.css";

export default function Friends() {
  const { user, setUser } = useContext(AuthContext);
  const { email } = user;
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);
  useEffect(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl + "/api/users/", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setFriendList(data.friends);
      setUser((prev) => {
        prev.friends = data.friends;
        return {
          ...prev,
        };
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="friends-page">
      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="t-al-c">Friends</h2>
            <div className="container">
              {user.friends.length === 0 ? (
                <div className="profile_details_card">
                  <h3>No friends found</h3>
                </div>
              ) : (
                user.friends.map((friend) => {
                  return <FriendCard name={friend} />;
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
