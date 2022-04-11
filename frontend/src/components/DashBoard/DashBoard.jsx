import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import DisplayBox from "../DisplayBox/DisplayBox";
import Profile from "../Profile/Profile";
import { getDashboard } from "../../util/api";
import { AuthContext } from "../../util/context/AuthContext";

import person from "../../assets/person.png";
import "./DashBoard.css";

export default function DashBoard() {
  // from params
  const { username: requiredUser } = useParams();

  // logged in user
  const { user: loggedUser } = useContext(AuthContext);

  // states
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { name, username, rank, github, leetcode, codechef } =
    userDetails || {};
  const [profileNum, setProfileNum] = useState(1);

  // useEffect
  useEffect(async () => {
    setLoading(true);
    const userData = await getDashboard(requiredUser);
    setUserDetails(userData);
    setLoading(false);
  }, [requiredUser]);

  const handleClick = (index) => {
    return () => {
      setProfileNum(index);
    };
  };

  return (
    <div className="dashboard">
      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="dashboard__user">
              <span>
                <img src={person} alt="user" />
              </span>
              <h2>{name}</h2>
              <p>Username: {username}</p>
              <p>Rank : {rank}</p>
            </div>
            <div className="dashboard__profiles">
              <button
                onClick={handleClick(1)}
                className={`dashboard__profiles__menu ${
                  profileNum === 1 ? "selected" : null
                }`}
              >
                Github
              </button>
              <button
                onClick={handleClick(2)}
                className={`dashboard__profiles__menu ${
                  profileNum === 2 ? "selected" : null
                }`}
              >
                LeetCode
              </button>
              <button
                onClick={handleClick(3)}
                className={`dashboard__profiles__menu ${
                  profileNum === 3 ? "selected" : null
                }`}
              >
                CodeChef
              </button>
            </div>

            <DisplayBox showValue={1} currValue={profileNum}>
              <Profile profile="github" details={github} />
            </DisplayBox>

            <DisplayBox showValue={2} currValue={profileNum}>
              <Profile profile="leetcode" details={leetcode} />
            </DisplayBox>

            <DisplayBox showValue={3} currValue={profileNum}>
              <Profile profile="codechef" details={codechef} />
            </DisplayBox>
          </>
        )}
      </div>
    </div>
  );
}
