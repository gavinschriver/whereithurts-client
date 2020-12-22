import React from "react";
import BadgeField from "./BadgeField";
import ShowHideSection from "./ShowHideSection";

const BadgeToggleGroup = ({ showing, setShowing, ...props }) => {
  return (
    <div className="badge_toggle_group">
      <ShowHideSection
        showing={showing}
        setShowing={setShowing}
        {...props}
      >
        {props.children}
        <BadgeField direction="add" {...props} />
      </ShowHideSection>

      <BadgeField direction="remove" {...props}/>
    </div>
  );
};

export default BadgeToggleGroup;
