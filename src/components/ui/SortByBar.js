import React from "react";
import SelectBar from "./SelectBar";

const SortByBar = ({label="Sort by:",...props}) => {
  return (
    <div className="sortbybar">
      <SelectBar label={label} {...props} />
    </div>
  );
};

export default SortByBar;
