import React from "react";

import { container, input_label, input_field } from "./Input.module.css";

export default function Input(props) {
  const { label, ...attr } = props;
  return (
    <div className={container}>
      <label className={input_label}>{label}</label>
      <input className={input_field} {...attr} />
    </div>
  );
}
