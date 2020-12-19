import React from "react";
import SelectBar from "./SelectBar";

const PAIN_LEVELS = [
  { id: 1, painlevel: "1 - not noticeable/ maintenance level" },
  { id: 2, painlevel: "2" },
  { id: 3, painlevel: "3" },
  { id: 4, painlevel: "4" },
  { id: 5, painlevel: "5 - noticeable during/after intense activity" },
  { id: 6, painlevel: "6" },
  { id: 7, painlevel: "7" },
  { id: 8, painlevel: "8" },
  { id: 9, painlevel: "9" },
  { id: 10, painlevel: "10 - prevents workouts, interferes with daily life" },
];

const PainLevelSelectBar = (props) => {
  return (
    <SelectBar
      collection={PAIN_LEVELS}
      optionkey="id"
      optionvalue="id"
      defaultoptiontext="Please choose a current pain level"
      label="Pain Level: "
      optiontext="painlevel"
      {...props}
    />
  );
};

export default PainLevelSelectBar;
