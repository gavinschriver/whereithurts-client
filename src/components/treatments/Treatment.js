import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../ui/Button";
import "./Treatments.css";

const Treatment = ({ treatment }) => {
  const current_user_id = parseInt(localStorage.getItem("patient_id"));
  const history = useHistory();

  return (
    <div className="treatment">
      <div className={`listitem ${treatment.owner && `owner--listitem`}`}>
        <div className="row listitem__header header--treatment">
          <Button onClick={() => history.push(`/treatments/${treatment.id}`)}>
            <h3 className="treatment__name">{treatment.name}</h3>
            <div className="treatment__type">
              <h3 className="treatment__treatmenttype__name">
                {treatment.treatmenttype.name}
              </h3>
              <img
                className="treatment__treatmenttype__image"
                src={treatment.treatmenttype.image}
              />
            </div>
          </Button>
        </div>

        <div className="row listitem__content">
          <div className="treatment__bodypart">
            <h3 className="treatment__bodypart__name">
              {treatment.bodypart.name}
            </h3>
          </div>

          <div className="listitem__subcollection">
            {treatment.hurts.map((h) => {
              if (h.patient.id === current_user_id) {
                return (
                  <span key={h.id} className="listitem__subcollection__item">
                    {h.name}
                  </span>
                );
              }
            })}
          </div>

          <div className="col align-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
