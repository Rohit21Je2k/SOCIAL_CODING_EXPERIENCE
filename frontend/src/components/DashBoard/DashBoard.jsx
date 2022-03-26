import React, { useState, useEffect } from "react";

import person from "../../assets/person.png";
import Github from "../Profile/Github";
import "./DashBoard.css";

export default function DashBoard() {
  const [currActBtn, setCurrActBtn] = useState(null);
  const [profileNum, setProfileNum] = useState(1);

  useEffect(() => {
    const el = document.querySelector(".dashboard__profiles").firstChild;
    el.classList.add("selected");
    setCurrActBtn(el);
  }, []);

  console.log(profileNum);

  const handleClick = (e) => {
    return (index) => {
      return (e) => {
        const el = e.target;
        if (!el.classList.contains("selected")) {
          currActBtn.classList.remove("selected");
          el.classList.add("selected");
          setProfileNum(index);
          setCurrActBtn(el);
        }
      };
    };
  };
  return (
    <div className="dashboard">
      <div className="wrapper">
        <div className="dashboard__user">
          <span>
            <img src={person} alt="user" />
          </span>
          <h2>Rohit21Je2k</h2>
          <p>Joined on 25th March, 2022</p>
          <button>Add Friend</button>
        </div>
        <div className="dashboard__profiles">
          <button
            onClick={handleClick()(1)}
            className="dashboard__profiles__menu"
          >
            Github
          </button>
          <button
            onClick={handleClick()(2)}
            className="dashboard__profiles__menu"
          >
            LeetCode
          </button>
          <button
            onClick={handleClick()(3)}
            className="dashboard__profiles__menu"
          >
            CodeForces
          </button>
        </div>
        {profileNum === 1 && <Github />}
        {profileNum === 2 && (
          <>
            <h1>LeetCode</h1>
          </>
        )}
        {profileNum === 3 && (
          <>
            <h1>Code Forces</h1>
          </>
        )}
      </div>
    </div>
  );
}
