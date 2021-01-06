import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import TreatmentControlGroup from "./TreatmentControlGroup";
import ShowHideControls from "../ui/ShowHideControls";
import { TreatmentContext } from "./TreatmentProvider";
import "./Treatments.css";
import { buildQueryString } from "../../utils/helpers";
import SearchBar from "../ui/SearchBar";
import HurtSelectBar from "../hurts/HurtSelectBar";
import Treatment from "./Treatment";
import Loader from "../ui/Loader";

const TreatmentList = () => {
  const [showControls, setShowControls] = useState(true);

  //list data loading state
  const [listDataLoaded, setListDataLoaded] = useState(false);

  //fitler
  const [filters, setFilters] = useState({ owner: 1 });
  const [searchTerms, setSearchTerms] = useState("");
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: parseInt(value) });
  };

  // search

  const handleChangeSearchTerms = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSubmitSearchTerms = () => {
    getTreatmentsBySearchTerms(searchTerms);
  };

  const handleClearSearchTerms = () => {
    setSearchTerms("");
    _getTreatmentsByQuerystring();
  };

  const {
    getTreatmentsByQuerystring,
    getTreatmentsBySearchTerms,
    treatmentData,
  } = useContext(TreatmentContext);

  const history = useHistory();

  const _getTreatmentsByQuerystring = async () => {
    await getTreatmentsByQuerystring(buildQueryString(filters));
  };

  useEffect(() => {
    setListDataLoaded(false);
    _getTreatmentsByQuerystring().then(() => {
      setListDataLoaded(true);
    });
  }, [filters]);

  const listData = () => {
    if (listDataLoaded) {
      return (
        <div className="list treatmentlist__list">
          {treatmentData.treatments.map((t) => {
            return <Treatment treatment={t} key={t.id} />;
          })}
        </div>
      );
    }

    return <Loader />;
  };

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Treatment Library"
          onClick={(e) => {
            e.preventDefault();
            history.push("/treatments/new");
          }}
        >
          <div className="treatmentlist__controls">
            <ShowHideControls
              showing={showControls}
              setShowing={() =>
                setShowControls((previousState) => !previousState)
              }
            >
              <TreatmentControlGroup
                handleFilterChange={handleFilterChange}
                isOwner={filters.owner}
                bodypartId={filters.bodypart_id}
                treatmentTypeId={filters.treatmenttype_id}
              >
                <HurtSelectBar
                  label="Filter by Hurt:"
                  name="hurt_id"
                  onChange={handleFilterChange}
                  value={filters.hurt_id}
                />
              </TreatmentControlGroup>
              <SearchBar
                label="Search all:"
                value={searchTerms}
                onChange={handleChangeSearchTerms}
                onSearch={handleSubmitSearchTerms}
                onClear={handleClearSearchTerms}
              />
            </ShowHideControls>
          </div>
          {listData()}
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentList;
