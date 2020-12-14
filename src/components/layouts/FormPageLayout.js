import React from "react";
import Button from "../ui/Button";

const FormPageLayout = (props) => {
  return (
    <div className="formpage_layout">
      {props.children}
      <div className="row">
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default FormPageLayout;
