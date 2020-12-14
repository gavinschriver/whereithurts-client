import React from "react";
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
        <span>WILL BE AN ADDABLE BADGEFIELD</span>
      </ShowHideSection>
      <span>WILL BE A REMOVEABLE BADGEFIELD</span>
    </div>
  );
};

export default BadgeToggleGroup;
