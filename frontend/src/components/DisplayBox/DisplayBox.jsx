import React from "react";
import "./DisplayBox.css";
export default function DisplayBox(props) {
  const { showValue, currValue, children } = props;

  if (currValue === showValue) {
    return <div>{children}</div>;
  }

  return <></>;
}
