import React from "react";
import { Link, useHistory } from "react-router-dom";
import { secondsToRoundedMinutes, toMMDDYYYY } from "../../utils/helpers";
import Button from "../ui/Button";

const Healing = ({ healing }) => {
  const history = useHistory();
  const timeSpent = secondsToRoundedMinutes(healing.duration);
  return (
    <div className="healing">
      <div className="listitem">
        <Button onClick={() => history.push(`/healings/${healing.id}`)}>
          <div className="col">
              <h3>Healing on {toMMDDYYYY(healing.added_on)}</h3>
            <h3>
              Time spent: {timeSpent} minute{timeSpent > 1 && `s`}
            </h3>
          </div>
          <div className="col">
            <div className="listitem__subcollection healing__hurts">
              <span className="listitem__subcollection__heading">
                Tagged Hurts:
              </span>
              {healing.hurts.map((h, index) => {
                return (
                  <span key={index} className="listitem__subcollection__item">
                    {h.name}
                  </span>
                );
              })}
            </div>
          </div>
        </Button>
        <div className="row">
          <div className="listitem__subcollection">
            <span className="listitem__subcollection__heading">
              Treatments Used:
            </span>
            {healing.treatments.map((t, index) => {
              return (
                <span key={index} className="listitem__subcollection__item">
                  {t.name}
                </span>
              );
            })}
          </div>
          <div className="listitem__subcollection"></div>
        </div>
      </div>
    </div>
  );
};

export default Healing;
