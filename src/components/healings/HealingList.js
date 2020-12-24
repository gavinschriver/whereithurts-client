import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { buildQueryString, secondsToRoundedMinutes } from "../../utils/helpers";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import HurtSelectBar from "../hurts/HurtSelectBar";
import ShowHideControls from "../ui/ShowHideControls";
import { HealingContext } from "./HealingProvider";
import HealingSortBar from "./HealingSortBar";

const HealingList = () => {
  const current_user_id = parseInt(localStorage.getItem("patient_id"));
  const { getHealingDataByQuerystring, healingData } = useContext(
    HealingContext
  );

  const history = useHistory();

  // filters; intialized with patient ID of current patient so we don't bring in non-user-healings
  const [filters, setFilters] = useState({ patient_id: current_user_id });
  const [hurtId, setHurtId] = useState(0);
  const [order, setOrder] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    getHealingDataByQuerystring(buildQueryString(filters));
  }, [filters]);

  useEffect(() => {
    setFilters({
      patient_id: current_user_id,
      hurt_id: parseInt(hurtId),
      order_by: order,
      direction: direction,
    });
    console.log(filters)
  }, [hurtId, order, direction]);

  //controls
  const [showListControls, setShowListControls] = useState(false);
  const toggleListControls = () =>
    setShowListControls((prevState) => !prevState);

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
            <ShowHideControls
              setShowing={toggleListControls}
              showing={showListControls}
            >
              <HurtSelectBar
                label="Filter by Hurt:"
                defaultoptiontext="All"
                onChange={(e) => setHurtId(e.target.value)}
              />
              <HealingSortBar
                onChange={(e) => {
                  const orderBy = e.target.value.split('-')[0]
                  const direction = e.target.value.split('-')[1]
                  setOrder(orderBy);
                  setDirection(direction);
                }}
              />
            </ShowHideControls>
            <div>
              Total Healing Time:{" "}
              {secondsToRoundedMinutes(healingData.total_healing_time)} minutes
            </div>
            {healingData.healings.map((h) => {
              return (
                <div className="listitem" key={h.id}>
                  <Button onClick={() => history.push(`/healings/${h.id}`)}>
                    <div className="col">
                      <h3>Date: {h.date_added}</h3>

                      <h3>
                        Time spent: {secondsToRoundedMinutes(h.duration)}{" "}
                        minutes
                      </h3>
                    </div>
                    <div className="listitem__subcollection">
                      {h.treatments.map((t) => {
                        return (
                          <span
                            key={t.id}
                            className="listitem__subcollection__item"
                          >
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
