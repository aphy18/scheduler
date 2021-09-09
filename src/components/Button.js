import React from "react";
import classnames from "classnames";
import styles from "./Button.scss";

let cx = classnames.bind(styles);



export default function Button(props) {
   const buttonClass = cx("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
  
    return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
}

