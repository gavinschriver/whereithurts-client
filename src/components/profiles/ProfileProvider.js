import React, { createContext, useState } from "react";
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}profiles`;

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const getSnapshotByPatientId = async (patientId) => {
    const response = await request(`${resourceURL}/${patientId}/snapshot`);
    const snapshot = await response.json();
    return snapshot;
  };
    


  return (
    <ProfileContext.Provider value={{ getSnapshotByPatientId }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
