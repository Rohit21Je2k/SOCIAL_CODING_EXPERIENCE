import React from "react";
import "./DisplayBox.css";
export default function DisplayBox(props) {
  const { showValue, currValue, children } = props;

  return (
    <div className={showValue === currValue ? null : "display-none"}>
      {children}
    </div>
  );
}
