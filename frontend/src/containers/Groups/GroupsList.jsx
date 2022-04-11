import React from "react";

import GroupCard from "./GroupCard";
import "./GroupsList.css";

export default function GroupsList() {
  return (
    <div className="groups-list">
      <GroupCard name="DSA C++" />
      <GroupCard name="DSA C++" />
      <GroupCard name="DSA C++" />
      <GroupCard name="DSA C++" />
    </div>
  );
}
