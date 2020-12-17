import React from "react";
import "./Ui.css";

export const TextInput = ({label, ref, ...props}) => {

  return (
      <fieldset className="textinput">
        {label && (
          <label {...props} className="textinput__label">
            {label}:{" "}
          </label>
        )}
      <input type="text" {...props} ref={ref} className="textinput__input" />
      </fieldset>
  );
};

export default TextInput