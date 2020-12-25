import React from "react";

/** Generic UI Select Bar. Default option value is 0 but can be overriden (e.g. for a default sort option) */ 

const SelectBar = (props) => {
  const {
    collection = [],
    optionkey,
    optionvalue,
    optiontext,
    defaultoptiontext,
    defaultoptionvalue = 0,
    label,
  } = props;
  return (
    <fieldset className="selectbar">
      <label htmlFor={props.name}>{label}</label>
      <select className="selectbar__dropdown" {...props}>
        <option
          className="selectbar__dropdown__option"
          value={defaultoptionvalue}
        >
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
