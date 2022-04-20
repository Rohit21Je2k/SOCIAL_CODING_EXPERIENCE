import React from "react";

import Card from "../../ui/Card/Card";

import groupPNG from "../../assets/group.png";

import "./GroupCard.css";

export default function GroupCard(props) {
  const { name, ...attr } = props;
  return (
    <Card className="group-card" {...attr}>
      <img src={groupPNG} alt="group-png" />
      <h4>{name}</h4>
    </Card>
  );
}
