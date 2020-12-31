import React from "react";
import Button from "./Button";
import AddIcon from "../../assets/images/black_plus_icon.png";

const AddNewButton = (props) => {
  return (
    <div className="button--addnew">
      <Button onClick={props.onClick}>
        <h3 className="addnew__button__text">Add New</h3>
        <img className="addnew__button__image" src={AddIcon} />
        {props.children}
      </Button>
    </div>
  );
};

export default AddNewButton;
