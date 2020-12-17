import React, { createContext, useState } from "react";
import { BASE_URL, request } from "../../utils/request";

const resourceURL = `${BASE_URL}treatmenttypes`;

export const TreatmentTypeContext = createContext();

export const TreatmentTypeProvider = (props) => {
  const [treatmentTypes, setTreatmentTypes] = useState([]);

  const getTreatmentTypes = async () => {
    const response = await request(`${resourceURL}`);
    const treatmentTypes = await response.json();
    setTreatmentTypes(treatmentTypes);
  };

  return (
    <TreatmentTypeContext.Provider
      value={{ treatmentTypes, getTreatmentTypes }}
    >
      {props.children}
    </TreatmentTypeContext.Provider>
  );
};

