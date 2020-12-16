import React from "react";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";

const TreatmentToggleGroup = (props) => {

  return (
    <div className="treatment_toggle_group">
      <BadgeToggleGroup
        resource="treatment"
        showhidetext="Treatments"
        badgeText="name"
        {...props}
      />
    </div>
  );
};

export default TreatmentToggleGroup;
