import React, { useState } from "react";
import Button from "./Button";
import BlackCirclePlus from "../../assets/images/icons/black_circle_plus.png";
import WhiteCircleX from "../../assets/images/icons/white_x_icon_4.png"

const Badge = ({
  direction,
  onAdd,
  resource,
  onRemove,
  id,
  className = "",
  ...props
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const action = direction === "add" ? onAdd : onRemove;
  const addOrRemoveIcon =
    direction === "add" ? (
      <img alt="add" src={BlackCirclePlus} />
    ) : (
      <img alt="remove" src={WhiteCircleX} />
    );

  return (
    <span className="badge" id={id}>
        <Button className={direction ? `toggle--badge--button--left` : `badge--button`} {...props} onClick={() => setShowDetail(!showDetail)} />
      {direction && (
          <Button
            onClick={action}
            id={`toggle-button-${direction}-${resource}-${id}`}
            className={`toggle--button toggle--badge--button--right toggle--button--${direction}`}
          >
            {addOrRemoveIcon}
          </Button>
      )}
    </span>
  );
};

export default Badge;
