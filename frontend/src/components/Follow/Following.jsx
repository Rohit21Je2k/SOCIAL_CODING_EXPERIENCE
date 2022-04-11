import React, { useState, useContext } from "react";
import FollowCard from "./FollowCard";
import Card from "../../ui/Card/Card";
import unfollow from "../../util/api/unfollow";
import { AuthContext } from "../../util/context/AuthContext";

import "./Following.css";
export default function Following(props) {
  const { data, setData } = props;
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleClick = (followUsername, index) => {
    return async () => {
      setLoading(true);
      await unfollow(user.username, followUsername, token);
      setData((prevData) => {
        prevData.following = prevData.following.filter((v, ind) => {
          return ind != index;
        });
        return { ...prevData };
      });
      setLoading(false);
    };
  };

  return (
    <div className="following">
      {data.following.length === 0 ? (
        <Card className="empty_card">
          <h4>No Following</h4>
        </Card>
      ) : (
        data.following.map((username, index) => {
          return (
            <FollowCard
              key={index}
              username={username}
              onClick={handleClick(username, index)}
              status="unfollow"
              loading={loading}
            />
          );
        })
      )}
    </div>
  );
}
