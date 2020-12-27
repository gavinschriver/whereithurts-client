import React from "react";
import Button from "./Button";

/**
 *
 * @param {Array} detailconfig array of key names corresponding to the item object that specifies which values from that object to map over and present as a detail
 * @param {Function} onClose function to pass to the Button component that toggles the state of the modal rendering the BadgeDetail to closed
 *
 */

const BadgeDetail = ({ detailconfig = [], onClose, item }) => {
  return (
    <div className="badgedetail">
      <Button onClick={onClose}>x</Button>
      {detailconfig.map((configkey) => {
        //make sure a property actually exists on the item with that name
        if (item[configkey]) 
          
        // {bodypart} and {treatmenttype} resources have a "name" prop to extract
        if (configkey === "bodypart" || configkey === "treatmenttype")
          return (
            <div
              className="badgedetail__item"
              key={`${item["id"]}-${item[configkey]["name"]}`}
            >
              {item[configkey]["name"]}
            </div>
          );
        
        // treatment resources have a [links] attribute, so we need to map those
        if (configkey === "links")
          return item[configkey].map((link) => {
            return (
              <div className="badgedetail__item" key={link.id}>
                <a target="_blank" href={link.linkurl}>
                  {link.linktext}
                </a>
              </div>
            );
          });
        
        //default (configkey value is a string)
        return (
          <div key={`${item["id"]}`} className="badgedetail__item">
            {item[configkey]}
          </div>
        );

      }
      )}
    </div>
  );
};

export default BadgeDetail;
