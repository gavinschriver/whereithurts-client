import React from "react";
import "./Ui.css";

export const TextInput = ({ label, isrequired, extraLabel, ...props }) => {
  const requiredClass = isrequired === 'true' ? 'required' : ''
  return (
    <fieldset className="textinput">
      {label && <label className="textinput__label">{label}: </label>}
      <div className={`textinput__input`}>
        {extraLabel && <span className="textinput__input__extralabel">{extraLabel}</span>}
        <input type="text" {...props} className={`textinput__input__control ${requiredClass}`} />
        {props.children}
      </div>
    </fieldset>
  );
};

export default TextInput;
