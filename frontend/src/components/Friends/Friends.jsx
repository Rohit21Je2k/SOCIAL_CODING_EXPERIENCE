import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import FriendCard from "./FriendCard";
import apiUrl from "../../api";

import "./Friends.css";

export default function Friends() {
  const { user } = useContext(AuthContext);
  const { email } = user;
  const [friendList, setFriendList] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(apiUrl + "/api/users/", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data.friends);
      setFriendList(data.friends);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="friends-page">
      <div className="wrapper">
        <h2 className="t-al-c">Friends</h2>
        <div className="container">
          {friendList.length === 0 ? (
            <h3>No friends</h3>
          ) : (
            friendList.map((friend) => {
              return <FriendCard name={friend} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
