import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";

import person from "../../assets/person.png";
import Codechef from "../Profile/Codechef";
import Github from "../Profile/Github";
import LeetCode from "../Profile/LeetCode";

import DisplayBox from "../DisplayBox/DIsplayBox";
import "./DashBoard.css";

export default function DashBoard() {
  const { user } = useContext(AuthContext);
  const [currActBtn, setCurrActBtn] = useState(null);
  const [profileNum, setProfileNum] = useState(1);
  const { github_username, leetcode_username, codechef_username } = user;
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
            CodeChef
          </button>
        </div>
        <DisplayBox showValue={1} currValue={profileNum}>
          <Github username={github_username} />
        </DisplayBox>

        <DisplayBox showValue={2} currValue={profileNum}>
          <LeetCode username={leetcode_username} />
        </DisplayBox>

        <DisplayBox showValue={3} currValue={profileNum}>
          <Codechef username={codechef_username} />
        </DisplayBox>
      </div>
    </div>
  );
}
