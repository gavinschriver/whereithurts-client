import React from "react";
import Button from "./Button";

const DeleteButton = (props) => {
  const { onDelete } = props;
  return (
    <div className="delete--button">
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default DeleteButton