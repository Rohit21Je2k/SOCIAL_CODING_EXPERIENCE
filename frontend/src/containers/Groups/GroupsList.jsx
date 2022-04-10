import React from "react";

import GroupCard from "./GroupCard";
import "./GroupsList.css";

export default function GroupsList() {
  return (
    <div className="groups-list">
      <GroupCard name="Emac Lovers" />
      <GroupCard name="Emac Lovers" />
      <GroupCard name="Emac Lovers" />
      <GroupCard name="Emac Lovers" />
    </div>
  );
}
