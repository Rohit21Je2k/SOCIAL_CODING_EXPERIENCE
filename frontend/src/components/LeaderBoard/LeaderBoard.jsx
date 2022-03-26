import React from "react";

import person from "../../assets/person.png";

import "./LeaderBoard.css";

function LeaderBoardCard(props) {
  const { name, rank } = props;
  return (
    <div className="leaderBoard_card">
      <span>
        <img src={person} />
      </span>
      <h3>{name}</h3>
      <h4>Rank {rank}</h4>
      <button className="like">Like</button>
      <button className="dislike">DisLike</button>
    </div>
  );
}

export default function LeaderBoard() {
  return (
    <div className="leaderBoard">
      <div className="wrapper">
        <div className="container">
          <LeaderBoardCard name="Rohit" rank="1" />
          <LeaderBoardCard name="Anuj" rank="2" />
        </div>
      </div>
    </div>
  );
}
