import React from "react";
import Button from "./Button";

const Alert = (props) => {
  return (
    <div className="alert">
      <div className="alert__closebutton">
        <Button onClick={props.onClose}>x</Button>
      </div>
      <div className="alert__text">{props.children}</div>
    </div>
  );
};

export default Alert;
