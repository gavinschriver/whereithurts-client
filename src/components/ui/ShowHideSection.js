import React from "react";
import Button from "./Button";
import "./Ui.css";
import AddIcon from "./../../assets/images/black_plus_icon.png";
import RemoveIcon from "./../../assets/images/black_minus_icon.png";

/**
 * 
 * @param {string} showhidetext label for section
 * @param {string} buttontext label for button when section is hidden (defaults to "Add More")
 * @param {boolean} showing t/f value to control display of section contents (children)
 * @param {setShowing} function callback to control state of section display
 */

const ShowHideSection = (props) => {
  const { showhidetext, buttontext = 'Add more', showing, setShowing = () => {} } = props;

  const src = showing ? RemoveIcon : AddIcon;

  return (
    <div className="showhidesection">
      <div className="showhidesection__header">
        <h3 className="showhidesection__header__text">{showhidetext}</h3>
        <div className="showhidesection__header__button button--addclose">
          <Button onClick={() => setShowing(!showing)}>
            <span className="showhide__section">{showing ? "Close" : buttontext}</span>
            <img src={src} alt="show hide section button" />
          </Button>
        </div>
      </div>
      <div className="showhidesection__content">
        {showing && props.children}
      </div>
    </div>
  );
};

export default ShowHideSection;
