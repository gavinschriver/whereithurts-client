import React from "react";
import Button from "./Button";
import "./Ui.css"

const ShowHideSection = (props) => {
  const { showHideText, showing, setShowing } = props;

  const src = showing ? "" : "./../../assets/images/black_plus.png";

  return (
    <div className="showhidesection">
      <div className="showhidesection__header">
        <h3 className="showhidesection__header__text">{showHideText}</h3>
        <Button
          className="showhidesection__header__button"
          onClick={() => setShowing(!showing)}
        >
          {showing ? "Close" : "Add more"}
          <img src={src} alt="show hide section button"/>
        </Button>
      </div>
      {showing && props.children}
    </div>
  );
};

export default ShowHideSection;
