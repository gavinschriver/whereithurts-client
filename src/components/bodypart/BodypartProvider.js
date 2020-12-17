import React, { createContext, useState } from "react";
import { BASE_URL, request } from "../../utils/request";

const resourceURL = `${BASE_URL}bodyparts`;

export const BodypartContext = createContext();

export const BodypartProvider = (props) => {
  const [bodyparts, setBodyparts] = useState([]);

  const getBodyparts = async () => {
    const response = await request(`${resourceURL}`);
    const bodyparts = await response.json();
    setBodyparts(bodyparts);
  };

  return (
    <BodypartContext.Provider
      value={{ bodyparts, getBodyparts }}
    >
      {props.children}
    </BodypartContext.Provider>
  );
};

