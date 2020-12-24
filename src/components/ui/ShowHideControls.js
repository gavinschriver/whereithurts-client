import React from "react";
import Button from "./Button";

const ShowHideControls = ({ showing, setShowing, ...props }) => {
  return (
    <div className="showhidecontrols">
      <div className="row align-right">
        <div className="showhidecontrols__showhidebutton">
          <Button onClick={setShowing}>
            {showing ? "Hide Controls" : "Show Controls"}
          </Button>
        </div>
      </div>
      <div className="showhidecontrols__controls">
        {showing && props.children}
      </div>
    </div>
  );
};

export default ShowHideControls;
