import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../ui/Button";

const Treatment = ({ treatment }) => {
  const history = useHistory();

  return (
    <div className="treatment">
      <div className={`listitem ${treatment.owner && `owner--listitem`}`}>
        <Button onClick={() => history.push(`/treatments/${treatment.id}`)}>
          <h3 className="treatment__name">{treatment.name}</h3>
          <h3 className="treatment__bodypart__name">
            {treatment.bodypart.name}
          </h3>
        </Button>
      </div>
    </div>
  );
};

export default Treatment
