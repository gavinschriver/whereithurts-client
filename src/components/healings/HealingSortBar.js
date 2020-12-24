import React from "react";
import SortByBar from "../ui/SortByBar";

const COLLECTION = [{ id: 1, name: "Oldest", value: "added_on-asc" }];

const HealingSortBar = (props) => {
  return (
    <div className="healingsortbar">
      <SortByBar
        collection={COLLECTION}
        optionkey="id"
        optionvalue="value"
        optiontext="name"
        defaultoptiontext="Newest"
        defaultoptionvalue="added_on-desc"
        {...props}
      />
    </div>
  );
};

export default HealingSortBar;
