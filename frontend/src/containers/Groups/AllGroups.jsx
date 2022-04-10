import React from "react";
import GroupsList from "./GroupsList";
import GroupsChat from "./GroupsChat";

import "./AllGroups.css";
export default function AllGroups() {
  return (
    <div className="all-groups">
      <GroupsList />
      <GroupsChat />
    </div>
  );
}
