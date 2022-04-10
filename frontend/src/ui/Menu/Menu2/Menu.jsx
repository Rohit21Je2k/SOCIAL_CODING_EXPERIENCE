import React from "react";
import { menu, menuBtn, selected } from "./Menu.module.css";

function Menu(props) {
  const { children } = props;
  return <div className={menu}>{children}</div>;
}

function Item(props) {
  const { children, className, ...attr } = props;
  console.log(className);
  return (
    <button
      className={`${menuBtn} ${className === "selected" ? selected : null}`}
      {...attr}
    >
      {children}
    </button>
  );
}

Menu.Item = Item;

export default Menu;
