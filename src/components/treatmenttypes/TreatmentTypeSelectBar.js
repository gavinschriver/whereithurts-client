import React, { useContext, useEffect } from "react";
import SelectBar from "../ui/SelectBar";
import { TreatmentTypeContext } from "./TreatmentTypeProvider";

const TreatmentTypeSelectBar = ({
  name = "treatmenttype",
  defaultoptiontext = "Select a treatment type",
  ...props
}) => {
  const { treatmentTypes, getTreatmentTypes } = useContext(
    TreatmentTypeContext
  );

  useEffect(async () => {
    await getTreatmentTypes();
  }, []);

  return (
    <SelectBar
      name={name}
      label="Type: "
      optionkey="id"
      optiontext="name"
      optionvalue="id"
      defaultoptiontext={defaultoptiontext}
      collection={treatmentTypes}
      {...props}
    ></SelectBar>
  );
};

export default TreatmentTypeSelectBar;
