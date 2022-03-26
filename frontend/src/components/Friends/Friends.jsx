import React from "react";
import FriendCard from "./FriendCard";

import "./Friends.css";

export default function Friends() {
  return (
    <div className="friends-page">
      <div className="wrapper">
        <h2 className="t-al-c">Friends</h2>
        <div className="container">
          <FriendCard />
          <FriendCard />
        </div>
      </div>
    </div>
  );
}
