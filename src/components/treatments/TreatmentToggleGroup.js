import React from "react";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";

const TreatmentToggleGroup = (props) => {
  return (
    <div className="treatment_toggle_group">
      <BadgeToggleGroup
        resource="treatment"
        showhidetext="Treatments"
        badgeText="name"
        detailconfig={{configkeys: ["name", "added_by", "bodypart", "treatmenttype", "notes", "links"]}}
        {...props}
      >
        {props.children}
      </BadgeToggleGroup>
    </div>
  );
};

export default TreatmentToggleGroup;
