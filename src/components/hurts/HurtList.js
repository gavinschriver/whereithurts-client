import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPage from "../layouts/ListPage";
import Button from "../ui/Button";
import { HurtContext } from "./HurtProvider";
import ShowHideControls from "../ui/ShowHideControls";
import ControlGroup from "../ui/ControlGroup";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import SortByBar from "../ui/SortByBar";
import { buildQueryString } from "../../utils/helpers";
import Loader from "../ui/Loader";

const SORT_OPTIONS = [
  { id: 1, name: "Oldest", value: "added_on-asc" },
  { id: 2, name: "Most Recently Updated", value: "recently_updated-desc" },
  { id: 3, name: "Least Recently Updated", value: "recently_updated-asc" },
];

const HurtList = () => {
  // setup
  const current_user_id = parseInt(localStorage.getItem("patient_id"));
  const { hurts, getHurtsByQuerystring } = useContext(HurtContext);
  const history = useHistory();

  //showhide controls
  const [showControls, setShowControls] = useState(false);

  // filters
  const [filters, setFilters] = useState({
    show_inactive: true,
    patient_id: current_user_id,
    order_by: "added_on-desc",
  });
  const handleFilterChange = (e) => {
    let { name, value } = e.target;
    if (name !== "order_by") {
      value = parseInt(value);
    }
    setFilters({ ...filters, [name]: value });
  };

  const _getHurtsByQuerystring = async () => {
    await getHurtsByQuerystring(buildQueryString(filters));
  };

  useEffect(() => {
    setListDataLoaded(false);
    _getHurtsByQuerystring().then(() => {
      setListDataLoaded(true);
    });
  }, [filters]);

  //loading state
  const [listDataLoaded, setListDataLoaded] = useState(false);

  const listData = () => {
    if (listDataLoaded) {
      return (
        <div className="list hurtlist">
          {hurts.map((h) => {
            return (
              <div
                className={
                  h.is_active ? "row listitem" : " row listitem listitem--inactive"
                }
                key={h.id}
              >
                <div className="col">
                  <Button onClick={() => history.push(`hurts/${h.id}`)}>
                    <div className="col">
                      <h3 className="listitem__heading">{h.name}</h3>
                      <img src={h.bodypart.hurt_image} />
                      <h3>Bodypart: {h.bodypart.name}</h3>
                    </div>
                  </Button>
                  <div className="col">
                    <h3>Last update: {h.last_update}</h3>
                    <h3>Healings: {h.healing_count}</h3>
                  </div>
                </div>
                <div className="col">
                  <div className="listitem__subcollection">
                    <h3 className="listitem__subcollection__heading">
                      Tagged Treatments:
                    </h3>
                    {h.treatments.map((t, index) => {
                      return (
                        <span
                          key={index}
                          className="listitem__subcollection__item"
                        >
                          {t.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return <Loader />;
  };

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPage
          resource="Hurt Locker"
          onClick={(e) => {
            e.preventDefault();
            history.push(`hurts/new`);
          }}
        >
          <div className="hurtlist__controls">
            <ShowHideControls
              showing={showControls}
              setShowing={() => setShowControls((prevState) => !prevState)}
            >
              <ControlGroup>
                <div className="row">
                  <label htmlFor="show_inactive">Show Inactive</label>
                  <input
                    name="show_inactive"
                    type="checkbox"
                    checked={filters.show_inactive ? true : false}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        show_inactive: e.target.checked,
                      });
                    }}
                  />
                </div>
                <BodypartSelectBar
                  name="bodypart_id"
                  value={filters.bodypart_id}
                  onChange={handleFilterChange}
                />
                <SortByBar
                  collection={SORT_OPTIONS}
                  name="order_by"
                  optionkey="id"
                  optionvalue="value"
                  optiontext="name"
                  defaultoptiontext="Newest"
                  defaultoptionvalue="added_on-desc"
                  onChange={handleFilterChange}
                  value={filters.order_by}
                />
              </ControlGroup>
            </ShowHideControls>
            {listData()}
          </div>
        </ListPage>
      </div>
    </BasicPage>
  );
};

export default HurtList;
