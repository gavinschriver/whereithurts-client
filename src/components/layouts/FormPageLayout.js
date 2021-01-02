import React from "react";
import Button from "../ui/Button";
/**
 * 
 * @param {string} resource Name of resource, formatted for heading display
 * @param {boolean} isEditMode true/false value determined by calling parent Form component; used to determine first part of heading
 * @param {React component} alert React component acting as alert for form validation
 * @param {boolean} showAlert true/false state determining if the alert should be shown
 * @param {function} onClick function passed down to Button used as Save affordance
 */

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
      <h1 className="page_title">
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
