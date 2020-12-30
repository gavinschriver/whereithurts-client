import React from "react";
import Button from "../ui/Button";

const FormPageLayout = ({
  resource,
  isEditMode,
  alert,
  showAlert,
  onClick,
  ...props
}) => {
  return (
    <div className="formpage_layout">
      <h1>
        {isEditMode ? `Edit` : `New`} {resource}
      </h1>
      {props.children}
      <div className="row">
        <Button onClick={onClick} {...props}>
          Save
        </Button>
      </div>
      {showAlert && alert}
    </div>
  );
};

export default FormPageLayout;
