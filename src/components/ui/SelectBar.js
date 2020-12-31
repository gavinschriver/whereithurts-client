import React from "react";

/** Generic UI Select Bar.
 * @param {array} collection array of objects used to populate options elements rendered by the selectbar
 * @param {string} optionkey name of property on the objects in the collection the value of which is used for the value of the "key" prop in the <option></option> elements returned by mapping over collection
 * @param {string} optionvalue name of property on the objects in the collection the value of which is used for the value of the "value" prop in the <option></option> elements returned by mapping over colleciton
 * @param {string} defaultoptiontext text to be displayed in first <option></option> element 
 * @param {integer} defaultoptionvalue value of 'value' prop of first <option></option> element; defaults to 0
 * @param {string} label text to be displayed in the <label></label> element for this fieldset
 * @param {string} isrequired string of 'true' or 'false' that determines whether a classname of 'required' should be added to the <select></select> element; used for validation UI
 * 
 * all other props are passed to the <select></select> element as {...props}
 * */ 

const SelectBar = (props) => {
  const {
    collection = [],
    optionkey,
    optionvalue,
    optiontext,
    defaultoptiontext,
    defaultoptionvalue = 0,
    label,
    isrequired
  } = props;
  const requiredClass = isrequired === 'true' ? 'required' : ''
  return (
    <fieldset className="selectbar">
      <label htmlFor={props.name}>{label}</label>
      <select className={`selectbar__dropdown ${requiredClass}`} {...props}>
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
