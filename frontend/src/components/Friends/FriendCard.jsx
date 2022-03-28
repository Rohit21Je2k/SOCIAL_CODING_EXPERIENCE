import React from "react";

import person from "../../assets/person.png";

import "./FriendCard.css";

export default function FriendCard(props) {
  const { name } = props;
  return (
    <div className="friend_card">
      <span>
        <img src={person} />
      </span>
      <h3>{name}</h3>
      <button>Unfriend</button>
    </div>
  );
}
