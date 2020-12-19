import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import { TreatmentContext } from "./TreatmentProvider";

const TreatmentList = (props) => {
  const { getTreatmentsByPatientId, treatments } = useContext(TreatmentContext);

  const history = useHistory();

  useEffect( () => {
     getTreatmentsByPatientId(localStorage.getItem("patient_id"));
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Treatment Library"
          onClick={(e) => {
            e.preventDefault();
            history.push("/treatments/new");
          }}
        >
                  <div className="treatmentlist">
                      {treatments.map((t) => {
                          return (
                              <div className="listitem" key={t.id}>
                                  <Button onClick={() => history.push(`/treatments/${t.id}`)}>
                                      <div className="col">
                                          <h3>Name: {t.name}
                                          </h3>
                                          <h3>Bodypart: {t.bodypart.name}</h3>
                                      </div>
                                      <div className="listitem__subcollection"> 
                                          {
                                              t.hurts.map((h) => {
                                                  if (h.patient.id === parseInt(localStorage.getItem("patient_id"))) {
                                                      return (
                                                          <span key={h.id} className="listitem__subcollection__item">
                                                              {h.name}
                                                          </span>
                                                      )
                                                  }
                                              })
                                        }
                                      </div>
                                  </Button>
                              </div>
                          )
                      })}
          </div>
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentList;
