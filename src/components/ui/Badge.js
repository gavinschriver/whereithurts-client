import React, {useState} from "react"
import Button from "./Button";

const Badge = ({ direction, onAdd, resource, onRemove, id, className = "", ...props }) => {
    const [showDetail, setShowDetail] = useState(false);

    const action = direction === "add" ? onAdd : onRemove;
    const addOrRemoveIcon =
      direction === "add" ? <img alt="add" /> : <img alt="remove" />;

    return (
      <span className="badge" id={id}
      >
        <Button {...props} onClick={() => setShowDetail(!showDetail)} />

        {direction && (
          <Button
            onClick={action}
            id={`toggle-button-${direction}-${resource}-${id}`}
          >
            {addOrRemoveIcon}
          </Button>
        )}

      </span>
    );
};
  
export default Badge