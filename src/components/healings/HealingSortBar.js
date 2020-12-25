import React from "react";
import SortByBar from "../ui/SortByBar";

/**
 * values are split on '-' to isolate the order critereon [0] from its value [1], most likely asc or desc (alpha, numerical, date-based, etc)
 */

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
