import React from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPage from "../layouts/ListPage";

const UpdateList = () => {
  const history = useHistory();

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPage
          resource="Updates"
          onClick={(e) => {
            e.preventDefault();
            history.push("/updates/new");
          }}
        >
          <main className="updatelist"></main>
        </ListPage>
      </div>
    </BasicPage>
  );
};

export default UpdateList;
