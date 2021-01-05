import React from "react";
import AddNewButton from "../ui/AddNewButton";

const ListPageLayout = (props) => {
  const { resource } = props;
  return (
    <div className="listpage_layout">
      <div className="row listpage__header">
        <h1 className="page_title">{resource}</h1>
        <AddNewButton onClick={props.onClick}/>
      </div>
      {props.children}
    </div>
  );
};

export default ListPageLayout;
