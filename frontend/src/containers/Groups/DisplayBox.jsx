import React from "react";

export default function DisplayBox(props) {
  const { currValue, showValue, children } = props;

  return (
    <div className={currValue == showValue ? "groups-chat" : "none"}>
      {children}
    </div>
  );
}
