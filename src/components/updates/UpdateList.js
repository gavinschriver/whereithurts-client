import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPage from "../layouts/ListPage";
import Button from "../ui/Button";
import { UpdateContext } from "./UpdateProvider";
import ControlGroup from "../ui/ControlGroup";
import SortByBar from "../ui/SortByBar";
import HurtSelectBar from "../hurts/HurtSelectBar";
import { buildQueryString } from "../../utils/helpers";

const SORT_OPTIONS = [{ id: 1, name: "Oldest", value: "added_on-asc" }];

const UpdateList = () => {
  const { getUpdatesByQuerystring, updates } = useContext(UpdateContext);
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));
  const history = useHistory();

  //filters
  const [filters, setFilters] = useState({ patient_id: current_patient_id });

  const handleFilterChange = (e) => {
    let { name, value } = e.target;
    if (name !== "order_by") {
      value = parseInt(value);
    }
    setFilters({ ...filters, [name]: value });
  };

  const _getUpdatesByQuerystring = () => {
    getUpdatesByQuerystring(buildQueryString(filters));
  };

  useEffect(() => {
    _getUpdatesByQuerystring();
  }, [filters]);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPage
          resource="Updates"
          onClick={(e) => {
            e.preventDefault();
            history.push("/updates/new");
          }}
        >
          <main className="updatelist">
            <ControlGroup>
              <HurtSelectBar
                label="Filter by Hurt:"
                value={filters.hurt_id}
                onChange={handleFilterChange}
                name="hurt_id"
              />
              <SortByBar
                optionkey="id"
                optionvalue="value"
                name="order_by"
                optiontext="name"
                defaultoptiontext="Newest"
                defaultoptionvalue="added_on-desc"
                collection={SORT_OPTIONS}
                onChange={handleFilterChange}
              />
            </ControlGroup>

            {updates
              .filter((u) => !u.is_first_update)
              .map((u) => {
                return (
                  <div
                    className={
                      u.hurt.is_active ? "listitem" : "listitem--inactive"
                    }
                    key={u.id}
                  >
                    <Button onClick={() => history.push(`/updates/${u.id}`)}>
                      <div className="col">
                        <h3>Update for: {u.hurt.name}</h3>
                        <h3>Pain Level: {u.pain_level}</h3>
                      </div>
                      <div className="align-right">
                        <h3>Date: {u.date_added}</h3>
                      </div>
                    </Button>
                  </div>
                );
              })}
          </main>
        </ListPage>
      </div>
    </BasicPage>
  );
};

export default UpdateList;
