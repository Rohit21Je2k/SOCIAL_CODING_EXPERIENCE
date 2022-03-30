import React, { useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import { unFriend } from "../../util/api/unfriend";

import person from "../../assets/person.png";

import "./FriendCard.css";

export default function FriendCard(props) {
  const { user, setUser } = useContext(AuthContext);
  const { name } = props;

  const handleClick = async () => {
    try {
      await unFriend(user.email, name);
      setUser((prev) => {
        let friends = prev.friends;
        friends = friends.filter((v) => v != name);
        prev.friends = friends;
        return {
          ...prev,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="friend_card">
      <span>
        <img src={person} />
      </span>
      <h3>{name}</h3>
      <button onClick={handleClick} className="btn">
        Unfriend
      </button>
    </div>
  );
}
