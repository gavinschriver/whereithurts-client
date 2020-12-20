import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { secondsToRoundedMinutes } from "../../utils/helpers";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import { HealingContext } from "./HealingProvider";

const HealingList = (props) => {
  const current_user_id = parseInt(localStorage.getItem("patient_id"))
  const { getHealingDataByPatientId, healingData } = useContext(HealingContext);

  const history = useHistory();

  useEffect( () => {
     getHealingDataByPatientId(current_user_id);
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Healings"
          onClick={(e) => {
            e.preventDefault();
            history.push("/healings/new");
          }}
        >
          <div className="healinglist">
            <div>Total Healing Time: {secondsToRoundedMinutes(healingData.total_healing_time)} minutes</div>
            {healingData.healings.map((h) => {
              return (
                <div className="listitem" key={h.id}>
                  <Button onClick={() => history.push(`/healings/${h.id}`)}>
                    <div className="col">
                      <h3>Date: {h.date_added}</h3>

                      <h3>Time spent: {secondsToRoundedMinutes(h.duration)} minutes</h3>
                    </div>
                    <div className="listitem__subcollection">
                      {h.treatments.map((t) => {
                        return (
                          <span key={t.id} className="listitem__subcollection__item">
                            {t.name}
                          </span>
                        );
                      })}
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingList;
