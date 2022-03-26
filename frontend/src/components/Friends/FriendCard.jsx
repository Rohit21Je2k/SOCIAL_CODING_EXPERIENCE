import React from "react";

import person from "../../assets/person.png";

import "./FriendCard.css";

export default function FriendCard() {
  return (
    <div className="friend_card">
      <span>
        <img src={person} />
      </span>
      <h3>Anuj Jain</h3>
      <button>Unfriend</button>
    </div>
  );
}
