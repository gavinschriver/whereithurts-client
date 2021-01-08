import React from "react";
import Button from "./Button";

/**
 *
 * @param {Object} detailconfig object with key names corresponding to info about the detail to be rendered; configkeys is an array of key names on the {item} to map over
 * @param {Array} detailconfig.configkeys array of key names for the object in the collection being mapped to produce the badge detail
 * @param {Function} onClose function to pass to the Button component that toggles the state of the modal rendering the BadgeDetail to closed
 * @param {Object} item object that is having its values inspected
 */

const BadgeDetail = ({ detailconfig = {configkeys:[]}, onClose, item }) => {
  return (
    <div className="badgedetail">
      <div className="badgedetail__closebutton">
        <Button onClick={onClose}>x</Button>
      </div>
      {detailconfig.configkeys.map((configkey) => {

        // decide what to call the "title" of the item being displayed as a detail
        const title =
          configkey === "bodypart"
            ? "Bodypart: "
            : configkey === "treatmenttype"
            ? "Type: "
            : configkey === "links"
            ? "Links: "
            : configkey === "name"
            ? "Name: "
            : configkey === "notes"
            ? "Notes: "
            : configkey === "date_added"
            ? "Date Added: "
            : "";

        //make sure a property actually exists on the item with that name before trying to access it
        if (item[configkey])
          if (configkey === "bodypart" || configkey === "treatmenttype")
            // {bodypart} and {treatmenttype} resources have a "name" prop to extract
            return (
              <div
                className="badgedetail__item"
                key={`${item["id"]}-${item[configkey]["name"]}`}
              >
                <h3 className="badgedetail__item__title">{title}</h3>
                <div className="badgedetail__item__info">
                  {item[configkey]["name"]}
                </div>
              </div>
            );

        // treatment resources have a [links] attribute, so we need to map those
        if (configkey === "links")
          return (
            <div
              key={item[configkey]}
              className="badgedetail__item badgedetail__item--links"
            >
              <h3 className="badgedetail__item__title">{title}</h3>
              {item[configkey].map((link) => {
                return (
                  <div
                    className="badgedetail__item__info badge__item__info--link"
                    key={link.id}
                  >
                    <a target="_blank" href={link.linkurl}>
                      {link.linktext}
                    </a>
                  </div>
                );
              })}
            </div>
          );

        if (configkey === "linktext") {
          return (
            <div
              key={item.id}
              className="badgedetail__item badgedetail__item--link"
            >
              <h3 className="badgedetail__item__title">Visit:</h3>

              <a target="_blank" href={item["linkurl"]}>
                {item[configkey]}
              </a>
            </div>
          );
        }

        //default (configkey value is a string)

        if (configkey === "name")
          return (
            <div key={item.id}>
              <h3 className="badegedetail__item__title">{item[configkey]}</h3>
            </div>
          );
        return (
          <div
            key={`${item["id"]}-${item[configkey]}`}
            className="badgedetail__item"
          >
            <h3 className="badgedetail__item__title">{title}</h3>
            <div className="badgedetail__item__info">{item[configkey]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BadgeDetail;
