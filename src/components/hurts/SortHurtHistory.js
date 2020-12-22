import React from "react";
import SelectBar from "../ui/SelectBar";

const SORT_OPTIONS = [
  { id: 1, value: "newest", text: "Newest First" },
  { id: 2, value: "oldest", text: "Oldest First" },
];

const SortHurtHistory = (props) => {
  return (
    <SelectBar
      collection={SORT_OPTIONS}
      optionkey="id"
      optionvalue="value"
      defaultoptiontext="Choose sort option"
      label="Sort By: "
      optiontext="text"
      {...props}
    />
  );
};

export default SortHurtHistory;
