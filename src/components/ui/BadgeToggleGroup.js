import React from "react";
import BadgeField from "./BadgeField";
import ShowHideSection from "./ShowHideSection";

const BadgeToggleGroup = ({ resource, showing, setShowing, ...props }) => {
  return (
    <div className="badge_toggle_group">
      <ShowHideSection
        showHideText={resource}
        showing={showing}
        setShowing={setShowing}
        {...props}
      >
        <BadgeField direction="add" {...props} />
      </ShowHideSection>

      <BadgeField direction="remove" {...props}/>
    </div>
  );
};

export default BadgeToggleGroup;
