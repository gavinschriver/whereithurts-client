import React from "react";
import "./Ui.css";

const Button = ({ className = "", onClick, children, disabled, id }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
