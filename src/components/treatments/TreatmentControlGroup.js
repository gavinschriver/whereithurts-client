import React from "react";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import ControlGroup from "../ui/ControlGroup";
import SearchBar from "../ui/SearchBar";

/**
 *
 * @param {Function} handleFilterChange handler to control values of filter object defined in parent component
 * @param {Integer} isOwner 0 designates radio button for "All Users", 1 for current patient; Could add additional int values for other options in button set
 * @param {Function} changeSearchTerms handler to control value of SearchBar's rendered input of type "text"
 *
 */
const TreatmentControlGroup = ({
  handleFilterChange,
  isOwner,
  bodypartId,
  treatmentTypeId,
  ...props
}) => {
  return (
    <div className="treatmentcontrolgroup">
      <ControlGroup>
        <div className="treatments_collection_select">
          <label htmlFor="owner">From all users</label>
          <input
            type="radio"
            id="all"
            name="owner"
            value={0}
            checked={isOwner == 0}
            onChange={handleFilterChange}
          />
          <label htmlFor="owner">Added By You</label>
          <input
            type="radio"
            id="owner"
            name="owner"
            value={1}
            checked={isOwner == 1}
            onChange={handleFilterChange}
          />
        </div>

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
        {props.children}
      </ControlGroup>
    </div>
  );
};

export default TreatmentControlGroup;
