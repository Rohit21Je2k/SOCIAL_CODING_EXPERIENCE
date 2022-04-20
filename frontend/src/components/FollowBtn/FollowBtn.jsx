import React, { useState, useContext } from "react";
import unfollow from "../../util/api/unfollow";
import follow from "../../util/api/follow";
import { AuthContext } from "../../util/context/AuthContext";

import "./FollowBtn.css";

export default function FollowBtn(props) {
  const { user, token } = useContext(AuthContext);
  const { status, followUsername } = props;
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(null);

  const handleUnfollow = async () => {
    try {
      setLoading(true);
      await unfollow(user.username, followUsername, token);
      setLoading(false);
      setUpdate(true);
    } catch (err) {
      setLoading(false);
      setUpdate(null);
      console.log(err);
    }
  };

  const handlefollow = async () => {
    try {
      setLoading(true);
      await follow(user.username, followUsername, token);
      setLoading(false);
      setUpdate(true);
    } catch (err) {
      setLoading(false);
      setUpdate(null);
      console.log(err);
    }
  };
  if (status == "none") {
    return <></>;
  }

  if (status == "following") {
    return (
      <button onClick={handleUnfollow} className="follow-btn">
        {loading ? "Sending" : update ? "Unfollowed" : "Following"}
      </button>
    );
  }

  return (
    <button onClick={handlefollow} className="follow-btn">
      {loading ? "Sending" : update ? "Following" : "Follow"}
    </button>
  );
}
