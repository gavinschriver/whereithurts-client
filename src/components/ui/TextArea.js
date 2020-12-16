import React from "react";
import "./Ui.css";

export const TextArea = (props) => {
  return (
      <fieldset className="textarea">
        {props.label && (
          <label {...props} className="textarea__label">
            {props.label}:{" "}
          </label>
        )}
        <input type="textarea" {...props} className="textarea__input" />
      </fieldset>
  );
};

export default TextArea
