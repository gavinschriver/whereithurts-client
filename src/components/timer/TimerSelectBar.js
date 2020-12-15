import React from "react";
import SelectBar from "../ui/SelectBar";

const TimerSelectBar = (props) => {
  const minutes = Array.from({ length: 21 }, (x, i) => i);
  const times = minutes
    .map((minute) => {
      return {
        secs: minute * 60,
        min: minute === 1 ? `${minute} minute` : `${minute} minutes`,
      };
    })
    .filter((i) => i.secs !== 0);
  return (
    <SelectBar
      {...props}
      collection={times}
      optionkey="secs"
      optiontext="min"
      optionvalue="secs"
      defaultoptiontext="Please select a time in minutes"
      label="Set Timer: "
    ></SelectBar>
  );
};

export default TimerSelectBar;
