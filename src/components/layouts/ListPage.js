import React from "react";

const ListPageLayout = (props) => {
  const { resource } = props 
  return (
    <div className="listpage_layout">
          <h1>{resource}</h1>
          {props.children}
    </div>
  );
};

export default ListPageLayout;
