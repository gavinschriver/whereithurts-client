import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPage from "../layouts/ListPage";
import Button from "../ui/Button";
import { UpdateContext } from "./UpdateProvider";

const UpdateList = () => {
  const { getUpdatesByPatientId, updates } = useContext(UpdateContext);
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));
  const history = useHistory();

  useEffect(() => {
    getUpdatesByPatientId(current_patient_id);
  }, []);

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
          <main className="updatelist">
            {updates.map((u) => {
              return (
                <div className={u.hurt.is_active ? "listitem" : "listitem--inactive"} key={u.id}>
                  <Button>
                    <div className="col">
                      <h3>Update for: {u.hurt.name}</h3>
                      <h3>Pain Level: {u.pain_level}</h3>
                    </div>
                  </Button>
                </div>
              );
            })}
          </main>
        </ListPage>
      </div>
    </BasicPage>
  );
};

export default UpdateList;
