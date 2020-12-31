import React from "react";
import Button from "./Button";

/**
 *
 * @param {function} onClose function to control the display state of the alert
 *
 * if children exist, use those contents as alert content value; default to the string below
 */

const Alert = ({ onClose, children }) => {
  return (
    <div className="alert">
      <div className="alert__closebutton">
        {onClose && <Button onClick={onClose}>x</Button>}
      </div>
      <div className="alert__content">
        {children ? children : "Please fill in all required fields"}
      </div>
    </div>
  );
};

export default Alert;
