import React, { createContext, useState } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}treatments`;

export const TreatmentContext = createContext();

export const TreatmentProvider = (props) => {
  const [treatments, setTreatments] = useState([]);

  const getTreatments = async () => {
    const response = await request(`${resourceURL}`);
    const treatments = await response.json();
    setTreatments(treatments);
  };

  const getTreatmentsByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const treatments = await response.json();
    setTreatments(treatments);
  };

  const getTreatmentsByQuerystring = async (querystring) => {
    const response = await request(`${resourceURL}${querystring}`);
    const treatments = await response.json();
    setTreatments(treatments);
  };

  //trim whitespace to make sure a search is not made for an empty string, which will return all items
  const getTreatmentsBySearchTerms = async (searchTerms) => {
    if (searchTerms.trim() !== "") {
      const response = await request(`${resourceURL}?q=${searchTerms}`);
      const treatments = await response.json();
      setTreatments(treatments);
    }
  };

  const createTreatment = async (newTreatment) => {
    const response = await request(`${resourceURL}`, "POST", newTreatment);
    const treatment = response.json();
    return treatment;
  };

  const getTreatmentById = async (treatmentId) => {
    const response = await request(`${resourceURL}/${treatmentId}`);
    const treatment = await response.json();
    return treatment;
  };

  const updateTreatment = async (treatmentId, updatedTreatment) => {
    return await request(
      `${resourceURL}/${treatmentId}`,
      "PUT",
      updatedTreatment
    );
  };

  const deleteTreatment = async (treatmentId) => {
    await request(`${resourceURL}/${treatmentId}`, "DELETE");
  };

  return (
    <TreatmentContext.Provider
      value={{
        treatments,
        getTreatments,
        createTreatment,
        getTreatmentsByPatientId,
        getTreatmentsByQuerystring,
        getTreatmentsBySearchTerms,
        getTreatmentById,
        updateTreatment,
        deleteTreatment,
      }}
    >
      {props.children}
    </TreatmentContext.Provider>
  );
};
