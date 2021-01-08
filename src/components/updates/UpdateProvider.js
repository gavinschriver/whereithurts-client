import React, { createContext, useState } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}updates`;

export const UpdateContext = createContext();

export const UpdateProvider = (props) => {
  const [updates, setUpdates] = useState([]);

  const getUpdates = async () => {
    const response = await request(`${resourceURL}`)
    const updates = await response.json()
    setUpdates(updates)
  }

  const getUpdatesByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}?patient_id=${patientId}`);
    const updates = await response.json();
    setUpdates(updates);
  };


  const getUpdateById = async (updateId) => {
    const response = await request(`${resourceURL}/${updateId}`);
    const update = await response.json();
    return update;
  };

  const createUpdate = async (newUpdate) => {
    const response = await request(`${resourceURL}`, "POST", newUpdate)
    const createdUpdate = response.json()
    return createdUpdate
  }

  const updateUpdate = async (updateId, updatedUpdate) => {
    return await request(
      `${resourceURL}/${updateId}`,
      "PUT",
      updatedUpdate
    );
  };

  const getUpdatesByQuerystring = async (querystring) => {
    const response = await request(`${resourceURL}${querystring}`)
    const updates = await response.json()
    setUpdates(updates)
  }

  const deleteUpdate = async (updateId) => {
    await request(`${resourceURL}/${updateId}`, "DELETE");
  };

  return <UpdateContext.Provider value={{createUpdate, getUpdateById, updateUpdate, getUpdates, deleteUpdate, getUpdatesByPatientId, updates, getUpdatesByQuerystring}}>{props.children}</UpdateContext.Provider>;
};
