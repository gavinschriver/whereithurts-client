import React, { useContext, useEffect } from "react";
import SelectBar from "../ui/SelectBar";
import { BodypartContext } from "./BodypartProvider";

const BodypartSelectBar = ({ defaultoptiontext = "Select a bodypart", label = "Bodypart: " , ...props }) => {
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
      defaultoptiontext={defaultoptiontext}
      collection={bodyparts}
      {...props}
    ></SelectBar>
  );
};

export default BodypartSelectBar;
