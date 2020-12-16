import React, {createContext, useState, useEffect} from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}hurts`

export const HurtContext = createContext();

export const HurtProvider = props => {
  const [hurts, setHurts] = useState([]);

  const getHurtsByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const hurts = await response.json();
    setHurts(hurts);
  };

  return (
    <HurtContext.Provider value={{ hurts, getHurtsByPatientId }}>
      {props.children}
    </HurtContext.Provider>
  );
};
