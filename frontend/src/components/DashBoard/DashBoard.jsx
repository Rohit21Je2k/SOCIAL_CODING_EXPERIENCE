import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import getMenu from "../../ui/Menu";
import Loader from "../Loader/Loader";
import DisplayBox from "../DisplayBox/DisplayBox";
import Profile from "../Profile/Profile";
import { getDashboard } from "../../util/api";
import { AuthContext } from "../../util/context/AuthContext";
import FollowBtn from "../FollowBtn/FollowBtn";
import Card from "../../ui/Card/Card";

import person from "../../assets/person.png";
import "./DashBoard.css";

export default function DashBoard() {
  // from params
  const { username: requiredUser } = useParams();

  // logged in user
  const { user: loggedUser } = useContext(AuthContext);

  const Menu = getMenu(2);

  // states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { name, username, rank, github, leetcode, codechef, followStatus } =
    userDetails || {};
  const [profileNum, setProfileNum] = useState(1);

  // useEffect
  useEffect(async () => {
    setLoading(true);
    const userData = await getDashboard(requiredUser, loggedUser?.username);
    if (!userData) {
      setUserDetails({});
      setError("Couldn't get userdata, Try Again");
    } else {
      setUserDetails(userData);
    }
    setLoading(false);
  }, [requiredUser, loggedUser]);

  const handleClick = (index) => {
    return () => {
      setProfileNum(index);
    };
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="wrapper">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="wrapper">
          <Card className="dashboard_error-card">{error}</Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="wrapper">
        {/* user details */}
        <div className="dashboard__user">
          <span>
            <img src={person} alt="user" />
          </span>
          <h2>{name}</h2>
          <p>Username: {username}</p>
          <p>Rank : {Math.floor(rank)}</p>
          <FollowBtn status={followStatus} followUsername={requiredUser} />
        </div>

        {/* menu */}
        <Menu className="dashboard_profile_menu">
          <Menu.Item
            onClick={handleClick(1)}
            className={profileNum === 1 ? "selected" : null}
          >
            Github
          </Menu.Item>
          <Menu.Item
            onClick={handleClick(2)}
            className={profileNum === 2 ? "selected" : null}
          >
            LeetCode
          </Menu.Item>
          <Menu.Item
            onClick={handleClick(3)}
            className={profileNum === 3 ? "selected" : null}
          >
            CodeChef
          </Menu.Item>
        </Menu>

        {/* coding profiles */}
        <DisplayBox showValue={1} currValue={profileNum}>
          <Profile profile="github" details={github} />
        </DisplayBox>

        <DisplayBox showValue={2} currValue={profileNum}>
          <Profile profile="leetcode" details={leetcode} />
        </DisplayBox>

        <DisplayBox showValue={3} currValue={profileNum}>
          <Profile profile="codechef" details={codechef} />
        </DisplayBox>
      </div>
    </div>
  );
}
