import React from "react";
import Button from "../ui/Button";

const DetailPageLayout = (props) => {
  const { onClick } = props;
  return (
    <div className="detailpage_layout">
      {props.children}
      <div className="row">
        <Button onClick={onClick} {...props}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default DetailPageLayout;
