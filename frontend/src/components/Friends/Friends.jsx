import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import Loader from "../Loader/Loader";
import FriendCard from "./FriendCard";
import apiUrl from "../../api";

import "./Friends.css";

export default function Friends() {
  const { user } = useContext(AuthContext);
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
              {friendList.length === 0 ? (
                <div className="profile_details_card">
                  <h3>No friends found</h3>
                </div>
              ) : (
                friendList.map((friend) => {
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
