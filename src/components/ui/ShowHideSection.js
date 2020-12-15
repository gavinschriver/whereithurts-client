import React from "react";
import Button from "./Button";
import "./Ui.css";
import AddIcon from "./../../assets/images/black_plus_icon.png";
import RemoveIcon from "./../../assets/images/black_minus_icon.png";

const ShowHideSection = (props) => {
  const { showhidetext, showing, setShowing } = props;

  const src = showing ? RemoveIcon : AddIcon;

  return (
    <div className="showhidesection">
      <div className="showhidesection__header">
        <h3 className="showhidesection__header__text">{showhidetext}</h3>
        <Button
          className="addclose--button"
          onClick={() => setShowing(!showing)}
        >
          <span>{showing ? "Close" : "Add more"}</span>
          <img src={src} alt="show hide section button"/>
        </Button>
      </div>
      {showing && props.children}
    </div>
  );
};

export default ShowHideSection;
