import React from "react";
import { HurtProvider } from "../hurts/HurtProvider";
import { UpdateProvider } from "../updates/UpdateProvider";

const UpdateProviders = (props) => {
  return (
    <UpdateProvider>
      <HurtProvider>{props.children}</HurtProvider>
    </UpdateProvider>
  );
};

export default UpdateProviders;
