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
import Loader from "../ui/Loader";

const HealingList = () => {
  const current_user_id = parseInt(localStorage.getItem("patient_id"));
  const { getHealingDataByQuerystring, healingData } = useContext(
    HealingContext
  );

  const history = useHistory();

  // list data loading state
  const [listDataLoaded, setListDataLoaded] = useState(false);

  // filters; intialized with patient ID of current patient so we don't bring in non-user-healings
  const [filters, setFilters] = useState({ patient_id: current_user_id });

  
  const _getHealingDataByQuerystring = async () => {
    await getHealingDataByQuerystring(buildQueryString(filters));
  };

  useEffect(() => {
    {
      setListDataLoaded(false);
      _getHealingDataByQuerystring().then(() => {
        setListDataLoaded(true);
      });
    }
  }, [filters]);

  // one filter change handler to rule them all

  const handleFilterChange = e => {
    let { name, value } = e.target;
    if (name !== "healing_sort") {
      value = parseInt(value);
      setFilters({ ...filters, [name]: value })
    }
    if (name === "healing_sort") {
      const orderBy = value.split("-")[0];
      const direction = value.split("-")[1];
      setFilters({...filters, order_by : orderBy, direction: direction})
    }
  }

  // useEffect(() => {
  //   setFilters({
  //     ...filters,
  //     hurt_id: parseInt(hurtId),
  //     order_by: order,
  //     direction: direction,
  //   });
  // }, [hurtId, order, direction]);

  //controls
  const [showListControls, setShowListControls] = useState(false);
  const toggleListControls = () =>
    setShowListControls((prevState) => !prevState);

  const listData = () => {
    if (listDataLoaded) {
      return (
        <div className="list healinglist__list">
          <div className="healinglist__header">
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
                      Time spent: {secondsToRoundedMinutes(h.duration)} minutes
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
      );
    }

    return <Loader />;
  };

  // main return
  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Your Healings"
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
                name="hurt_id"
                // onChange={(e) => setHurtId(e.target.value)}
                onChange={handleFilterChange}
              />
              <HealingSortBar
                name="healing_sort"
                onChange={handleFilterChange}
              />
            </ShowHideControls>
            {listData()}
          </div>
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingList;
