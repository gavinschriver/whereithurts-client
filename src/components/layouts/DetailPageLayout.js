import React from "react";
import Button from "../ui/Button";
import DeleteButton from "../ui/DeleteButton";

const DetailPageLayout = (props) => {
  const { onEdit, onDelete } = props;
  return (
    <div className="detailpage_layout">
      {props.children}
      <div className="row align-right">
        <Button onClick={onEdit} {...props}>
          Edit
        </Button>
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
};

export default DetailPageLayout;
