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
import Pagination from "../ui/Pagination";

const TreatmentList = () => {
  const [showControls, setShowControls] = useState(true);

  //list data loading state
  const [listDataLoaded, setListDataLoaded] = useState(false);

  //filter

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({ owner: 0, page: currentPage });
  const [searchTerms, setSearchTerms] = useState({
    search_terms: "",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: parseInt(value) });
  };

  // search

  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    console.log(isSearchMode);
  }, [isSearchMode]);

  const handleChangeSearchTerms = (e) => {
    setSearchTerms({ ...searchTerms, search_terms: e.target.value });
  };

  const handleSubmitSearchTerms = () => {
    setListDataLoaded(false);
    setIsSearchMode(true);
    getTreatmentsBySearchTerms({ ...searchTerms, page: 1 }).then(() => {
      setListDataLoaded(true);
    });
  };

  //when the user clears search terms, toggle search mode to OFF and re-initialized the searchTerms object
  // then grab treatments by querystring from current filters, making sure we set the "page=" value to 1
  // AND the curretPage state value back to 1 as well
  const handleClearSearchTerms = () => {
    setIsSearchMode(false);
    setSearchTerms({ search_terms: "", page: 1 });
    getTreatmentsByQuerystring(buildQueryString({ ...filters, page: 1 }));
    setCurrentPage(1);
  };

  const {
    getTreatmentsByQuerystring,
    getTreatmentsBySearchTerms,
    treatmentData,
  } = useContext(TreatmentContext);

  const history = useHistory();

  // call our async function
  // if searchMode is a thing, this is only happening if we're paginating
  // otherwise, we're in "filter mode", so check
  const _getTreatmentsByQuerystring = async () => {
    if (isSearchMode) {
      await getTreatmentsBySearchTerms({ ...searchTerms, page: currentPage });
    } else
      await getTreatmentsByQuerystring(
        buildQueryString({ ...filters, page: currentPage })
      );
  };

  //when page first loads, the filters change, OR the current page changes, set listDataLoaded to false, complete our
  //call to get _getTreatments, and set list data loaded to true when that resolves
  useEffect(() => {
    setListDataLoaded(false);
    _getTreatmentsByQuerystring().then(() => {
      setListDataLoaded(true);
    });
    console.log("usereffect1 ran");
  }, [filters, currentPage]);

  // IF we're in search mode, but user changes a filter, turn search mode OFF,
  // then invoke handleClearSearchTerms
  useEffect(() => {
    if (isSearchMode) {
      handleClearSearchTerms();
      console.log("useffect2 ran");
    }
  }, [filters]);

  useEffect(() => {
    console.log(`current page is ${currentPage}`);
  }, [currentPage]);

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
                value={searchTerms.search_terms}
                onChange={handleChangeSearchTerms}
                onSearch={handleSubmitSearchTerms}
                onClear={handleClearSearchTerms}
              />
              <Pagination
                page={currentPage}
                totalCount={treatmentData.count}
                pageBack={() => setCurrentPage(currentPage - 1)}
                pageForward={() => setCurrentPage(currentPage + 1)}
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
