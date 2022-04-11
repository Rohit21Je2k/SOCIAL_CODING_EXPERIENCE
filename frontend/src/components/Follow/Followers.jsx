import React, { useContext } from "react";
import FollowCard from "./FollowCard";
import Card from "../../ui/Card/Card";
import unfollow from "../../util/api/unfollow";
import { AuthContext } from "../../util/context/AuthContext";

import "./Followers.css";
export default function Followers(props) {
  const { data, setData } = props;
  const { user } = useContext(AuthContext);

  const handleClick = (followUsername, index) => {
    return async () => {
      await unfollow(followUsername, user.username);
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
