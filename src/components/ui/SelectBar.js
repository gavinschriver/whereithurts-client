import React from "react";

const SelectBar = (props) => {
  const {
    collection,
    optionkey,
    optionvalue,
    optiontext,
    defaultoptiontext,
    label,
  } = props;
  return (
    <fieldset className="selectbar">
      <label htmlFor={props.name}>{label}</label>
      <select className="selectbar__dropdown" {...props}>
        <option className="selectbar__dropdown__option" value={0}>
          {defaultoptiontext}
        </option>
        {collection.map((i) => {
          return (
            <option
              className="selectbar__dropdown__option"
              key={i[optionkey]}
              value={i[optionvalue]}
            >
              {i[optiontext]}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
};

export default SelectBar;
