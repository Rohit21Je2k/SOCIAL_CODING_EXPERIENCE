import React, { useState } from "react";

import GroupCard from "./GroupCard";
import GroupsChat from "./GroupsChat";
import DisplayBox from "./DisplayBox";
import "./GroupsList.css";

export default function GroupsList(props) {
  const [roomNo, setRoomNo] = useState(0);
  const handleClick = (num) => {
    return () => {
      setRoomNo(num);
    };
  };
  return (
    <>
      <div className="groups-list">
        <GroupCard onClick={handleClick(1)} name="DSA C++" id="dsa_cpp" />
        <GroupCard onClick={handleClick(2)} name="DSA Java" id="dsa_java" />
      </div>

      <DisplayBox showValue="1" currValue={roomNo}>
        <GroupsChat name="DSA C++" id="dsa_cpp" />
      </DisplayBox>

      <DisplayBox showValue="2" currValue={roomNo}>
        <GroupsChat name="DSA Java" id="dsa_java" />
      </DisplayBox>
    </>
  );
}
