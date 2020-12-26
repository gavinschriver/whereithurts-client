import React, { createContext, useState, useEffect } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}hurts`;

export const HurtContext = createContext();

export const HurtProvider = (props) => {
  const [hurts, setHurts] = useState([]);

  const getHurtsByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const hurts = await response.json();
    setHurts(hurts);
  };

  const createHurt = async (newHurt) => {
    const response = await request(`${resourceURL}`, "POST", newHurt);
    const hurt = await response.json();
    return hurt;
  };

  const getHurtById = async (hurtId) => {
    const response = await request(`${resourceURL}/${hurtId}`);
    const hurt = await response.json();
    return hurt;
  };

  const updateHurt = async (hurtId, hurt) => {
    await request(`${resourceURL}/${hurtId}`, "PUT", hurt);
  };

  const deleteHurt = async (hurtId) => {
    await request(`${resourceURL}/${hurtId}`, "DELETE");
  };

  const sortHurtHistory = async (hurtId, queryString) => {
    const response = await request(`${resourceURL}/${hurtId}?${queryString}`);
    const hurt = await response.json();
    return hurt;
  };

  const getHurtsByQuerystring = async (queryString) => {
    const response = await request(`${resourceURL}${queryString}`)
    const hurts = await response.json()
    setHurts(hurts)
  }

  return (
    <HurtContext.Provider
      value={{
        hurts,
        getHurtsByPatientId,
        createHurt,
        getHurtById,
        updateHurt,
        deleteHurt,
        sortHurtHistory,
        getHurtsByQuerystring
      }}
    >
      {props.children}
    </HurtContext.Provider>
  );
};
