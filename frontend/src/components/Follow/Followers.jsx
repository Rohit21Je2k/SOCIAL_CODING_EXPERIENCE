import React, { useContext } from "react";
import FollowCard from "./FollowCard";
import Card from "../../ui/Card/Card";
import { removeFollower } from "../../util/api";
import { AuthContext } from "../../util/context/AuthContext";

import "./Followers.css";
export default function Followers(props) {
  const { data, setData } = props;
  const { user, token } = useContext(AuthContext);

  const handleClick = (followUsername, index) => {
    return async () => {
      await removeFollower(followUsername, user.username, token);
      setData((prevData) => {
        prevData.followers = prevData.followers.filter((v, ind) => {
          return ind != index;
        });
        return { ...prevData };
      });
    };
  };

  return (
    <div className="followers">
      {data.followers.length === 0 ? (
        <Card className="empty_card">
          <h4>No Followers</h4>
        </Card>
      ) : (
        data.followers.map((username, index) => {
          return (
            <FollowCard
              key={index}
              username={username}
              onClick={handleClick(username, index)}
              status="Remove"
            />
          );
        })
      )}
    </div>
  );
}
