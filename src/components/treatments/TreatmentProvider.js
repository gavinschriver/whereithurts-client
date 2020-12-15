import React, {createContext, useState, useEffect} from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}treatments`

export const TreatmentContext = createContext();

export const TreatmentProvider = props => {
  const [treatments, setTreatments] = useState([]);

  const getTreatmentsByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const treatments = await response.json();
    setTreatments(treatments);
  };

  return (
    <TreatmentContext.Provider value={{ treatments, getTreatmentsByPatientId }}>
      {props.children}
    </TreatmentContext.Provider>
  );
};