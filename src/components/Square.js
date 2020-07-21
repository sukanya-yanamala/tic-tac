import React from "react";
import "./square.css";
export default function Square(props) {
  return (
    <button
      className={props.active}
      index={props.index}
      onClick={() => props.handleClick(props.index)}
    >
      {props.value}
    </button>
  );
}
