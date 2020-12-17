import React, { useContext, useEffect } from "react";
import SelectBar from "../ui/SelectBar";
import { TreatmentTypeContext } from "./TreatmentTypeProvider";

const TreatmentTypeSelectBar = (props) => {
  const { treatmentTypes, getTreatmentTypes } = useContext(
    TreatmentTypeContext
  );

  useEffect(async () => {
    await getTreatmentTypes();
  }, []);

  return (
    <SelectBar
      name="treatmenttype"
      label="Type: "
      optionkey="id"
      optiontext="name"
      optionvalue="id"
      defaultoptiontext="Select a treatment type"
      collection={treatmentTypes}
      {...props}
    ></SelectBar>
  );
};

export default TreatmentTypeSelectBar;
