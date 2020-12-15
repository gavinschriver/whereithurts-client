import React from "react";

const SelectBar = (props) => {
  const {
    collection,
    optionkey,
    optionvalue,
    optiontext,
    defaultoptiontext
  } = props;
  return (
    <select className="selectbar" {...props}>
      <option value={0}>{defaultoptiontext}</option>
      {collection.map((i) => {
        return (
          <option key={i[optionkey]} value={i[optionvalue]}>
            {i[optiontext]}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBar;
