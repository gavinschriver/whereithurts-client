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
          <div className="col">
            <div className="treatment__bodypart">
              <h4 className="treatment__bodypart__name">Bodypart:</h4>
              <div className="treatment__bodypart__image">
                <img src={treatment.bodypart.hurt_image} />
              </div>
              <h4> {treatment.bodypart.name}</h4>
            </div>
          </div>

          <div className="col">
            <div className="listitem__subcollection">
              <h4 className="listitem__subcollection__heading">
                Your tagged hurts:
              </h4>
              <div className="listitem__subcollection__collection">
                {treatment.hurts.map((h) => {
                  if (h.patient.id === current_user_id) {
                    return (
                      <span
                        key={h.id}
                        className="listitem__subcollection__item"
                      >
                        <Button onClick={() => history.push(`/hurts/${h.id}`)}>{h.name}</Button>
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
