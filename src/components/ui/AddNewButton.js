import React from "react";
import Button from "./Button";
import AddIcon from "../../assets/images/black_plus_icon.png";

const AddNewButton = (props) => {
  return (
    <div className="addnew--button">
      <Button onClick={props.onClick}>
        <h3>Add New</h3>
        <img src={AddIcon} />
        {props.children}
      </Button>
    </div>
  );
};

export default AddNewButton;
