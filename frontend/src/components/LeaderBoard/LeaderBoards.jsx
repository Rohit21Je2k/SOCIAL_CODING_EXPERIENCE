import React, { useState, useEffect } from "react";
import LeaderBoard from "./LeaderBoard";

import "./LeaderBoards.css";

export default function LeaderBoards() {
  const [currActBtn, setCurrActBtn] = useState(null);
  const [board, setBoard] = useState(1);

  useEffect(() => {
    const el = document.querySelector(".leaderBoards_menu").firstChild;
    el.classList.add("selected");
    setCurrActBtn(el);
  }, []);

  const handleClick = (e) => {
    return (index) => {
      return (e) => {
        const el = e.target;
        if (!el.classList.contains("selected")) {
          currActBtn.classList.remove("selected");
          el.classList.add("selected");
          setBoard(index);
          setCurrActBtn(el);
        }
      };
    };
  };
  return (
    <div className="leaderBoards">
      <div className="wrapper">
        <h2>LeaderBoards</h2>
        <div className="leaderBoards_menu">
          <button onClick={handleClick()(1)}>Global</button>
          <button onClick={handleClick()(2)}>Friends</button>
        </div>
        {board == 1 && <LeaderBoard />}
        {board == 2 && <LeaderBoard />}
      </div>
    </div>
  );
}
