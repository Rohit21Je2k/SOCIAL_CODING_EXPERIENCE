import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import apiUrl from "../../api";

import person from "../../assets/person.png";
import Codechef from "../Profile/Codechef";
import Github from "../Profile/Github";
import LeetCode from "../Profile/LeetCode";
import { useParams } from "react-router-dom";

import DisplayBox from "../DisplayBox/DisplayBox";
import "./DashBoard.css";

export default function DashBoard() {
  const { email: userEmail } = useParams();
  console.log(userEmail);

  const { user } = useContext(AuthContext);
  const { name, email, github_username, leetcode_username, codechef_username } =
    user;
  const [userDetails, setUserDetails] = useState(null);
  const [currActBtn, setCurrActBtn] = useState(null);
  const [profileNum, setProfileNum] = useState(1);

  console.log(user);
  useEffect(async () => {
    const el = document.querySelector(".dashboard__profiles").firstChild;
    el.classList.add("selected");
    setCurrActBtn(el);
    if (!userEmail) {
      return;
    }
    const userData = await getUser(userEmail);
    // console.log(userData);

    setUserDetails(userData);
  }, []);

  console.log(userDetails);

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
          <h2>{userDetails ? userDetails.name : name}</h2>
          <p>{userDetails ? userDetails.email : email}</p>
          {/* <button>Add Friend</button> */}
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
          <Github
            username={
              userDetails ? userDetails.github_username : github_username
            }
          />
        </DisplayBox>

        <DisplayBox showValue={2} currValue={profileNum}>
          <LeetCode
            username={
              userDetails ? userDetails.leetcode_username : leetcode_username
            }
          />
        </DisplayBox>

        <DisplayBox showValue={3} currValue={profileNum}>
          <Codechef
            username={
              userDetails ? userDetails.codechef_username : codechef_username
            }
          />
        </DisplayBox>
      </div>
    </div>
  );
}

async function getUser(email) {
  try {
    const response = await fetch(apiUrl + "/api/users/", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
