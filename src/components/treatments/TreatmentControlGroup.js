import React from "react";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import ControlGroup from "../ui/ControlGroup";
import SearchBar from "../ui/SearchBar";

/**
 * 
 * @param {Boolean} isOwner 
 * @param {Function} handleFilterChange handler to control values of filter object defined in parent component
 * @param {Function} changeSearchTerms handler to control value of SearchBar's rendered input of type "text"
 * 
 */
const TreatmentControlGroup = ({
  handleFilterChange,
  isOwner,
  changeSearchTerms,
  clearSearchTerms,
  submitSearchTerms,
  searchTerms,
  bodypartId,
  treatmentTypeId,
  ...props
}) => {
  return (
    <div className="treatmentcontrolgroup">
      <ControlGroup>
        <div className="treatments_collection_select">
          <label htmlFor="owner">Added By You</label>
          <input
            type="radio"
            id="owner"
            name="owner"
            value={1}
            checked={isOwner == 1}
            onChange={handleFilterChange}
          />
          <label htmlFor="owner">From all users</label>
          <input
            type="radio"
            id="all"
            name="owner"
            value={0}
            checked={isOwner == 0}
            onChange={handleFilterChange}
          />
          <BodypartSelectBar
            label="Filter by Bodypart: "
            defaultoptiontext="No filter chosen"
            onChange={handleFilterChange}
            value={bodypartId}
            name="bodypart_id"
          />
          <TreatmentTypeSelectBar
            label="Filter by Treatment Type: "
            defaultoptiontext="No filter chosen"
            onChange={handleFilterChange}
            value={treatmentTypeId}
            name="treatmenttype_id"
          />
          <SearchBar
            label="Search all treatments:"
            value={searchTerms}
            onChange={changeSearchTerms}
            onSearch={submitSearchTerms}
            onClear={clearSearchTerms}
            name="search_terms"
          />
        </div>
      </ControlGroup>
    </div>
  );
};

export default TreatmentControlGroup;
