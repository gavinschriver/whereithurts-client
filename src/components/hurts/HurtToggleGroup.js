import React from "react";
import { Link } from "react-router-dom";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";

const HurtToggleGroup = (props) => {

  return (
    <div className="hurt_toggle_group">
      <BadgeToggleGroup
        resource="hurt"
        showhidetext="Your Tagged Hurts"
        badgeText="name"
        {...props}
        missingText={<span>Nothing here, <Link to="/hurts/new">add more Hurts</Link> to get started</span>}
      />
    </div>
  );
};

export default HurtToggleGroup;
