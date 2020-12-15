import React, {useState} from "react"
import Button from "./Button";

const Badge = ({ direction, onAdd, onRemove, className = "", ...props }) => {
    const [showDetail, setShowDetail] = useState(false);

    const action = direction === "add" ? onAdd : onRemove;
    const addOrRemoveIcon =
      direction === "add" ? <img alt="add" /> : <img alt="remove" />;

    return (
      <span
        className={`badge ${className}`}
      >
        <Button {...props} onClick={() => setShowDetail(!showDetail)} />

        {/*if direction exists, it's a toggle badge, so add a button that will accept
        a toggle action

        remove actions need a reference to the id of the parent node (a button) of the img
        that gets clicked on 
        */}

        {direction && (
          <Button
            onClick={action}
            id={`toggle-btn-${direction}-${props.resource}-${props.id}`}
          >
            {addOrRemoveIcon}
          </Button>
        )}

        {/*if detail is set to true, show the detail component for this badge*/}
        {/* {showDetail && <BadgeDetail {...props}> </BadgeDetail>} */}
      </span>
    );
};
  
export default Badge