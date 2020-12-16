import React from "react";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";

const HurtToggleGroup = (props) => {

  return (
    <div className="hurt_toggle_group">
      <BadgeToggleGroup
        resource="hurt"
        showhidetext="Hurts"
        badgeText="name"
        {...props}
      />
    </div>
  );
};

export default HurtToggleGroup;
