import React from "react";
import Button from "../ui/Button";

const FormPageLayout = ({resource, isEditMode, onClick, ...props}) => {
  return (
    <div className="formpage_layout">
      <h1>{isEditMode ? `Edit` : `New`} {resource}</h1>
      {props.children}
      <div className="row">
        <Button onClick={onClick} {...props}>Save</Button>
      </div>
    </div>
  );
};

export default FormPageLayout;
