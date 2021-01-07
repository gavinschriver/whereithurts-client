import React, { createContext, useState } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}treatments`;

export const TreatmentContext = createContext();

export const TreatmentProvider = (props) => {
  const [treatmentData, setTreatmentData] = useState({treatments: []});

  const getTreatments = async () => {
    const response = await request(`${resourceURL}`);
    const treatmentData = await response.json();
    setTreatmentData(treatmentData);
  };

  const getTreatmentsByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const treatmentData = await response.json();
    setTreatmentData(treatmentData);
  };

  const getTreatmentsByQuerystring = async (querystring) => {
    const response = await request(`${resourceURL}${querystring}`);
    const treatmentData = await response.json();
    setTreatmentData(treatmentData);
  };

  /**
   * 
   * @param {object} searchTerms kv pairs of search_terms: <string>
   * and page: <int> (default of 1)
   */
  const getTreatmentsBySearchTerms = async (searchTerms) => {
    if (searchTerms.search_terms.trim() !== "") {
      const response = await request(`${resourceURL}?q=${searchTerms.search_terms}&page=${searchTerms.page}`);
      const treatmentData = await response.json();
      setTreatmentData(treatmentData);
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

  const tagTreatmentWithHurt = async (treatmentId, requestBody) => {
    await request(
      `${resourceURL}/${treatmentId}/tag_hurt`,
      "POST",
      requestBody
    );
  };

  const untagHurtFromTreatment = async (treatmentId, requestBody) => {
    await request(
      `${resourceURL}/${treatmentId}/tag_hurt`,
      "DELETE",
      requestBody
    )
  }

  return (
    <TreatmentContext.Provider
      value={{
        treatmentData,
        getTreatments,
        createTreatment,
        getTreatmentsByPatientId,
        getTreatmentsByQuerystring,
        getTreatmentsBySearchTerms,
        getTreatmentById,
        updateTreatment,
        deleteTreatment,
        tagTreatmentWithHurt,
        untagHurtFromTreatment
      }}
    >
      {props.children}
    </TreatmentContext.Provider>
  );
};
