import React, { createContext, useState } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}patients`;

export const PatientContext = createContext();

export const PatientProvider = (props) => {
  const [patient, setPatient] = useState({ recent_activity: [] });

  const getPatientById = async (patientId) => {
    const response = await request(`${resourceURL}/${patientId}`);
    const patient = await response.json();
    setPatient(patient);
  };

  return (
    <PatientContext.Provider value={{ getPatientById, patient }}>
      {props.children}
    </PatientContext.Provider>
  );
};
