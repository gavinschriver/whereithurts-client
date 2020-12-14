import React from "react";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";

const TreatmentToggleGroup = (props) => {
  return (
    <div className="treatment_toggle_group">
      <BadgeToggleGroup
        collection={[]}
        resource="Treatments"
        badgeText="label"
        detailconfig={[]}
        {...props}
      />
    </div>
  );
};

export default TreatmentToggleGroup;
