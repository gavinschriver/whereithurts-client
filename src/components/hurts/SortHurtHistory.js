import React from "react";
import SelectBar from "../ui/SelectBar";

const SORT_OPTIONS = [{ id: 1, value: "oldest", text: "Oldest First" }];

const SortHurtHistory = (props) => {
  return (
    <SelectBar
      collection={SORT_OPTIONS}
      optionkey="id"
      optionvalue="value"
      defaultoptiontext="Newest First"
      label="Sort By: "
      optiontext="text"
      defaultoptionvalue="newest"
      {...props}
    />
  );
};

export default SortHurtHistory;
