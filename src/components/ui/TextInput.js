import React from "react";
import "./Ui.css";

export const TextInput = (props) => {
  return (
      <fieldset className="textinput">
        {props.label && (
          <label {...props} className="textinput__label">
            {props.label}:{" "}
          </label>
        )}
        <input type="text" {...props} className="textinput__input" />
      </fieldset>
  );
};

export default TextInput