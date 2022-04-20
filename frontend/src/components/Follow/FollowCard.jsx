import React from "react";
import person from "../../assets/person.png";

import "./FollowCard.css";

export default function FollowCard(props) {
  const { username, status, loading, ...attr } = props;

  return (
    <div className="follow_card" {...attr}>
      <span>
        <img src={person} />
      </span>
      <h3>{username}</h3>
      <button className="btn">{status}</button>
    </div>
  );
}
