import React, { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";

const DeleteButton = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  const { onDelete } = props;

  return (
    <div className="deletebutton">
      {!showAlert && (
        <div className="deletebutton__delete button--delete">
          <Button onClick={() => setShowAlert(!showAlert)}>Delete</Button>
        </div>
      )}
      {showAlert && (
        <Alert>
          <div className="deletebutton__alert">
            <div className="deletebutton__alert__cancel button--cancel">
              <Button onClick={() => setShowAlert(!showAlert)}>Cancel</Button>
            </div>
            <div className="deletebutton__alert__confirm button--confirm">
              <Button onClick={onDelete} style={{ backgroundColor: `red` }}>
                Confirm Delete?
              </Button>
            </div>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default DeleteButton;
