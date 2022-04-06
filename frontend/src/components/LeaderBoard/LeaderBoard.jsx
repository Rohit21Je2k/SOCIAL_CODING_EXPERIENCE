import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import Loader from "../Loader/Loader";

import person from "../../assets/person.png";
import apiUrl from "../../api";

import "./LeaderBoard.css";

function LeaderBoardCard(props) {
  const { name, votes } = props;
  const prev = votes;
  const [vote, setVote] = useState(votes);

  const incr = () => {
    setVote(prev + 1);
  };

  const dcr = () => {
    if (vote > 0) {
      setVote(vote - 1);
    }
  };

  return (
    <div className="leaderBoard_card">
      <span>
        <img src={person} />
      </span>
      <h3 className="mw-100">{name}</h3>
      <h4>Votes {vote}</h4>
      <button onClick={incr} className="like">
        UpVote
      </button>
      <button onClick={dcr} className="dislike">
        DownVote
      </button>
    </div>
  );
}

export default function LeaderBoard(props) {
  const { type } = props;
  const { user } = useContext(AuthContext);
  const { email } = user;

  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  useEffect(async () => {
    try {
      setLoading(true);
      let data;
      if (type === "global") {
        data = await getGlobalLeaderBoard();
      } else {
        data = await getFriendLeaderBoard(email);
      }
      console.log(data);
      setUserList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="leaderBoard">
      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container">
              {userList.length === 0 ? (
                <h2>No Users</h2>
              ) : (
                userList.map((user, index) => {
                  return (
                    <LeaderBoardCard
                      key={index}
                      name={user.email || user}
                      votes={user.likes || 0}
                    />
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

async function getGlobalLeaderBoard() {
  try {
    const response = await fetch(apiUrl + "/api/users/leaderboard");
    const data = await response.json();

    return data.users;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getFriendLeaderBoard(email) {
  try {
    const response = await fetch(apiUrl + "/api/users/", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return data.friends;
  } catch (err) {
    console.log(err);
  }
}
