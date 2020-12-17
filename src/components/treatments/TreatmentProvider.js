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

  const createTreatment = async (newTreatment) => {
    const response = await request(`${resourceURL}`, "POST", newTreatment)
    const treatment = response.json()
    return treatment
  }

  const getTreatmentById = async (treatmentId) => {
    const response = await request(`${resourceURL}/${treatmentId}`)
    const treatment = await response.json()
    return treatment
  }

  return (
    <TreatmentContext.Provider value={{ treatments, createTreatment, getTreatmentsByPatientId, getTreatmentById }}>
      {props.children}
    </TreatmentContext.Provider>
  );
};
