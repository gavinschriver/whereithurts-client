import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  buildQueryString,
  secondsToRoundedMinutes,
  toMMDDYYYY,
} from "../../utils/helpers";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import HurtSelectBar from "../hurts/HurtSelectBar";
import ShowHideControls from "../ui/ShowHideControls";
import { HealingContext } from "./HealingProvider";
import HealingSortBar from "./HealingSortBar";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import Healing from "./Healing";

const HealingList = () => {
  const current_user_id = parseInt(localStorage.getItem("patient_id"));
  const { getHealingDataByQuerystring, healingData } = useContext(
    HealingContext
  );

  const history = useHistory();

  // list data loading state
  const [listDataLoaded, setListDataLoaded] = useState(false);

  // filters; intialized with patient ID of current patient so we don't bring in non-user-healings
  const [filters, setFilters] = useState({
    patient_id: current_user_id,
    page: 1,
  });

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

  const handleFilterChange = (e) => {
    let { name, value } = e.target;
    if (name !== "healing_sort") {
      value = parseInt(value);
      setFilters({ ...filters, [name]: value });
    }
    if (name === "healing_sort") {
      const orderBy = value.split("-")[0];
      const direction = value.split("-")[1];
      setFilters({ ...filters, order_by: orderBy, direction: direction });
    }
  };

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
          {healingData.healings.map((h, index) => {
            return <Healing healing={h} key={index} />;
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
                onChange={handleFilterChange}
              />
              <HealingSortBar
                name="healing_sort"
                onChange={handleFilterChange}
              />
              <Pagination
                page={filters.page}
                totalCount={healingData.count}
                pageBack={() =>
                  setFilters({ ...filters, page: filters.page - 1 })
                }
                pageForward={() =>
                  setFilters({ ...filters, page: filters.page + 1 })
                }
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
