import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Card from "../../ui/Card/Card";
import { getLeaderBoard } from "../../util/api";

import person from "../../assets/person.png";

import "./LeaderBoard.css";

export default function LeaderBoard(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  useEffect(async () => {
    setLoading(true);
    const data = await getLeaderBoard();
    if (!data) {
      setError("Couldn't get leaderboard, Try Again");
      setLoading(false);
      return;
    }
    setUserList(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="leaderBoard">
        <div className="wrapper">
          <h2>Leaderboard</h2>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderBoard">
        <div className="wrapper">
          <h2>Leaderboard</h2>
          <Card className="dashboard_error-card">{error}</Card>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderBoard">
      <div className="wrapper">
        <h2>Leaderboard</h2>
        <div className="container">
          {userList.map((user, index) => {
            return (
              <LeaderBoardCard
                key={index}
                username={user.username}
                rank={user.rank}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LeaderBoardCard(props) {
  const { username, rank } = props;
  return (
    <div className="leaderBoard_card">
      <span>
        <img src={person} />
      </span>
      <h3 className="mw-100">{username}</h3>
      <h4>Rank: {Math.floor(rank)}</h4>
    </div>
  );
}
