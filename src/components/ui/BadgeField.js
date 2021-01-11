import React from "react";
import Badge from "./Badge";

const BadgeField = ({
  selected = [],
  collection = [],
  badgeText,
  onAdd = () => {},
  onRemove,
  missingText = '',
  ...props
}) => {
  let badges;

  switch (props.direction) {
    case "add":
      //badges are addable
      // make sure
      badges = collection
        .filter((i) => !selected.some((s) => s.id === i.id))
        .map((i) => {
          return (
            <Badge
              key={i.id}
              onAdd={() => onAdd(i)}
              item={i}
              id={i.id}
              {...props}
            >
              {i[badgeText]}
            </Badge>
          );
        });
      break;

    // badges are removeable
    case "remove":
      badges = selected.map((i) => {
        return (
          <Badge key={i.id} onRemove={onRemove} item={i} id={i.id} {...props}>
            {i[badgeText]}
          </Badge>
        );
      });
      break;

    default:
      //badges are static
      badges = selected.map((i) => {
        return (
          <Badge key={i.id} item={i} {...props}>
            {i[badgeText]}
          </Badge>
        );
      });
  }
  return (
    <div
      className={`badgefield ${
        props.direction && `badgefield--${props.direction}`
      }`}
    >
      {badges.length ? badges : props.direction === "add" ? missingText : ''}
    </div>
  );
};

export default BadgeField;
