import React, { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";

const DeleteButton = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  const { onDelete } = props;

  return (
    <div className="deletebutton">
      {!showAlert && (
        <Button onClick={() => setShowAlert(!showAlert)}>Delete</Button>
      )}
      {showAlert && (
        <Alert>
          <div className="deletebutton__alert">
            <Button onClick={() => setShowAlert(!showAlert)}>Cancel</Button>
            <Button onClick={onDelete} style={{backgroundColor: `red`}}>Confirm Delete?</Button>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default DeleteButton;
