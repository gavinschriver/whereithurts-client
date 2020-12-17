import React, { useContext, useEffect } from "react";
import SelectBar from "../ui/SelectBar";
import { BodypartContext } from "./BodypartProvider";

const BodypartSelectBar = (props) => {
  const { bodyparts, getBodyparts } = useContext(
    BodypartContext
  );

  useEffect(async () => {
    await getBodyparts();
  }, []);

  return (
    <SelectBar
      name="bodypart"
      label="Bodypart: "
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
