import React from "react";
import { card } from "./Card.module.css";
export default function Card(props) {
  const { children, className, ...attr } = props;
  return (
    <div className={`${card} ${className}`} {...attr}>
      {children}
    </div>
  );
}
