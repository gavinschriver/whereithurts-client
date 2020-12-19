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

  const createHurt = async (newHurt) => {
    const response = await request(`${resourceURL}`, "POST", newHurt)
    const hurt = await response.json()
    return hurt
  }

  const getHurtById = async (hurtId) => {
    const response = await request(`${resourceURL}/${hurtId}`)
    const hurt = await response.json()
    return hurt
  }

  const updateHurt = async (hurtId, hurt) => {
    await request(`${resourceURL}/${hurtId}`, "PUT", hurt)
  }

  return (
    <HurtContext.Provider value={{ hurts, getHurtsByPatientId, createHurt, getHurtById, updateHurt }}>
      {props.children}
    </HurtContext.Provider>
  );
};
