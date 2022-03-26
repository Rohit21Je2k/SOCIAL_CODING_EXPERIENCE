import React from "react";
import FriendCard from "./FriendCard";

import "./Friends.css";

export default function Friends() {
  return (
    <div className="friends-page">
      <div className="wrapper">
        <FriendCard />

        <FriendCard />
      </div>
    </div>
  );
}
