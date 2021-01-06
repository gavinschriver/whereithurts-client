import React from "react";
import Button from "./Button";
import { MdAdd } from "react-icons/md";

const AddNewButton = (props) => {
  return (
    <div className="button--addnew">
      <Button onClick={props.onClick}>
        <h3 className="addnew__button__text">Add New</h3>
        <div className="addnew__button__icon">
          <MdAdd size="5em" />
        </div>
        {props.children}
      </Button>
    </div>
  );
};

export default AddNewButton;
