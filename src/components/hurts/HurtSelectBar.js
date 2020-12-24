import React, { useContext, useEffect } from "react";
import { HurtContext } from "./HurtProvider";
import SelectBar from "../ui/SelectBar";

const HurtSelectBar = ({ label="Hurt: ", defaultoptiontext = "Select a hurt", ...props }) => {
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));

  const { hurts, getHurtsByPatientId } = useContext(HurtContext);

  useEffect(() => {
    getHurtsByPatientId(current_patient_id);
  }, []);

  return (
    <SelectBar
      collection={hurts}
      label={label}
      optionkey="id"
      optiontext="name"
      optionvalue="id"
      defaultoptiontext={defaultoptiontext}
      {...props}
    />
  );
};

export default HurtSelectBar;
