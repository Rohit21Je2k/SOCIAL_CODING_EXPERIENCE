import React, { useState } from "react";

import GroupCard from "./GroupCard";
import GroupsChat from "./GroupsChat";
import DisplayBox from "./DisplayBox";
import "./GroupsList.css";
import Card from "../../ui/Card/Card";

export default function GroupsList(props) {
  const { groups } = props;

  const [roomNo, setRoomNo] = useState(0);
  const handleClick = (num) => {
    return () => {
      setRoomNo(num);
    };
  };
  if (!groups || groups.length === 0) {
    return (
      <>
        <Card className="error_card">No groups found</Card>
      </>
    );
  }
  return (
    <>
      <div className="groups-list">
        {groups.map((group, index) => {
          return (
            <GroupCard
              key={index}
              onClick={handleClick(index)}
              name={group.name}
              id={group.id}
            />
          );
        })}
      </div>

      {groups.map((group, index) => {
        return (
          <DisplayBox key={index} showValue={index} currValue={roomNo}>
            <GroupsChat name={group.name} id={group.id} />
          </DisplayBox>
        );
      })}
    </>
  );
}
