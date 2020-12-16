import React from "react";
import Button from "./Button";

const DismissableAlert = (props) => {
  const { text, onDismiss } = props;
  return (
    <div className="dismissablealert">
      <h3>{props.text}</h3>
      <Button>x</Button>
    </div>
  );
};
