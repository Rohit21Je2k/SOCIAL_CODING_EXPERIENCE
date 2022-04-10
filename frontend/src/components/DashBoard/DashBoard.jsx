import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// components
import apiUrl from "../../api";
import Loader from "../Loader/Loader";
import DisplayBox from "../DisplayBox/DisplayBox";
import Profile from "../Profile/Profile";
import AddFriendBtn from "../AddFriendBtn/AddFriendBtn";
import { getGithubData } from "../../util/api/Github/getGithubData";
import { getLeetcodeData } from "../../util/api/Leetcode/getLeetcodeData";
import { getCodechefData } from "../../util/api/Codechef/getCodechefData";
import { addFriend } from "../../util/api/addFriend";
import { AuthContext } from "../../util/context/AuthContext";

// assets
import person from "../../assets/person.png";

// css
import "./DashBoard.css";

export default function DashBoard() {
  // from params
  const { email: userEmail } = useParams();

  // logged in user
  const { user, setUser, token } = useContext(AuthContext);
  const { friends } = user || {};

  // states
  const [loading, setLoading] = useState(true);
  const [friendReqLoading, setFriendReqLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { name, email, github_username, leetcode_username, codechef_username } =
    userDetails || {};
  const [profileNum, setProfileNum] = useState(1);

  // useEffect
  useEffect(async () => {
    setLoading(true);
    const userData = await getUser(userEmail);
    setUserDetails(userData);
    setLoading(false);
  }, [userEmail]);

  const handleClick = (index) => {
    return () => {
      setProfileNum(index);
    };
  };

  const addFriendHandler = async () => {
    try {
      setFriendReqLoading(true);
      await addFriend(user.email, userEmail);
      setFriendReqLoading(false);
      alert("Friend request sent");
      setUser((prev) => {
        prev.friends.push(userEmail);
        return {
          ...prev,
        };
      });
    } catch (err) {
      console.log(err);
      // alert(err);
    }
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
              <p>{email}</p>
              <AddFriendBtn
                user={user}
                setUser={setUser}
                userEmail={userEmail}
              />
              {friendReqLoading && (
                <p className="m-t-20">Sending friend request...</p>
              )}
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
              <Profile username={github_username} getData={getGithubData} />
            </DisplayBox>

            <DisplayBox showValue={2} currValue={profileNum}>
              <Profile username={leetcode_username} getData={getLeetcodeData} />
            </DisplayBox>

            <DisplayBox showValue={3} currValue={profileNum}>
              <Profile username={codechef_username} getData={getCodechefData} />
            </DisplayBox>
          </>
        )}
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
