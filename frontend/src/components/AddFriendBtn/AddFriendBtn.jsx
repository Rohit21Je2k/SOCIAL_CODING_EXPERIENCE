import React, { useState } from "react";
import { addFriend } from "../../util/api/addFriend";

import "./AddFriendBtn.css";

export default function AddFriendBtn(props) {
  const { user, setUser, userEmail } = props;
  const [text, setText] = useState("Add Friend");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await addFriend(user.email, userEmail);
      setLoading(false);
      setText("Request Sent");
      alert("request Sent");
      setUser((prev) => {
        prev.friends = [...prev.friends, userEmail];
        return {
          ...prev,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <></>;
  }
  if (!userEmail) {
    return <></>;
  }

  if (user.email == userEmail) {
    return <></>;
  }

  if (user.friends?.includes(userEmail)) {
    return <></>;
  }
  return (
    <>
      <button onClick={handleClick} className="add-friend-btn">
        {text}
      </button>
      {loading && <p className="m-t-20">Sending Request</p>}
    </>
  );
}
