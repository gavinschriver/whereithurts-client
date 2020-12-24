import React, { useContext, useEffect } from "react";
import SelectBar from "../ui/SelectBar";
import { BodypartContext } from "./BodypartProvider";

const BodypartSelectBar = ({ label = "Bodypart: " , ...props }) => {
  const { bodyparts, getBodyparts } = useContext(
    BodypartContext
  );

  useEffect( () => {
     getBodyparts();
  }, []);

  return (
    <SelectBar
      name="bodypart"
      label={label}
      optionkey="id"
      optiontext="name"
      optionvalue="id"
      defaultoptiontext="Select a bodypart"
      collection={bodyparts}
      {...props}
    ></SelectBar>
  );
};

export default BodypartSelectBar;
