import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

/**
 *
 * @param {Object} detailconfig object with key names corresponding to info about the detail to be rendered; configkeys is an array of key names on the {item} to map over
 * @param {Array} detailconfig.configkeys array of key names for the object in the collection being mapped to produce the badge detail
 * @param {Function} onClose function to pass to the Button component that toggles the state of the modal rendering the BadgeDetail to closed
 * @param {Object} item object that is having its values inspected
 */

const BadgeDetail = ({
  detailconfig = { configkeys: [] },
  onClose,
  item,
  resourceName,
}) => {
  return (
    <div className="badgedetail">
      <div className="badgedetail__closebutton">
        <Button onClick={onClose}>x</Button>
      </div>
      <div className="badgedetail__content">
        {detailconfig.configkeys.map((configkey, index) => {
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
              : configkey === "latest_pain_level"
              ? "Current pain level: "
              : "";

          //make sure a property actually exists on the item with that name before trying to access it
          if (item[configkey])
            if (configkey === "name") {
              // item's 'name' if it exists will be treated like a section title; also, if a resourceName
              // has been passed in, the name will be a link to that item's detail page
              const itemTitle = resourceName ? (
                <Link to={`/${resourceName}/${item.id}`}>
                  <h2 className="badegedetail__item__title">{item.name}</h2>
                </Link>
              ) : (
                <h2 className="badegedetail__item__title">{item.name}</h2>
              );
              return (
                <div className="badgedetail__item" key={index}>
                  {itemTitle}
                </div>
              );
            }

          if (configkey === "bodypart" || configkey === "treatmenttype")
            // {bodypart} and {treatmenttype} resources have a "name" prop to extract; bodyparts have a .hurt_image, treatmenttypes have an .image
            return (
              <div
                className={`badgedetail__item badgedetail__item__${configkey}`}
                key={index}
              >
                <h3 className="badgedetail__item__title">{title}</h3>
                <div className="badgedetail__item__content">
                  <div className="badgedetail__item__image">
                    <img
                      src={
                        configkey === "bodypart"
                          ? item[configkey]["hurt_image"]
                          : item[configkey]["image"]
                      }
                    />
                  </div>
                  <div className="badgedetail__item__info">
                    {item[configkey]["name"]}
                  </div>
                </div>
              </div>
            );

          // treatment resources have a [links] attribute, so if added, we need to map those
          if (configkey === "links")
            return (
              <div
                key={index}
                className="badgedetail__item badgedetail__item--links"
              >
                <h3 className="badgedetail__item__title">{title}</h3>
                {item.links.map((link, index) => {
                  return (
                    <div
                      className="badgedetail__item__info badge__item__info--link"
                      key={index}
                    >
                      <a target="_blank" href={link.linkurl}>
                        {link.linktext}
                      </a>
                    </div>
                  );
                })}
              </div>
            );

          // for links as badges -- config key will be linktext
          if (configkey === "linktext")
            return (
              <div
                key={index}
                className="badgedetail__item badgedetail__item--link"
              >
                <h3 className="badgedetail__item__title">Visit:</h3>

                <a target="_blank" href={item["linkurl"]}>
                  {item[configkey]}
                </a>
              </div>
            );

          if (configkey == "added_by")
            return (
              <div key={index}>
                {item.added_by.username && (
                  <h4>Added by {item.added_by.username}</h4>
                )}
              </div>
            );

          //default (configkey value is a string)
          return (
            <div key={index} className="badgedetail__item">
              <h3 className="badgedetail__item__title">{title}</h3>
              <div className="badgedetail__item__info">{item[configkey]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeDetail;
