import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import FourOhFourPage from "../auth/404Page";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { TreatmentContext } from "./TreatmentProvider";
import BadgeField from "../ui/BadgeField";
import { HurtContext } from "../hurts/HurtProvider";

const TreatmentDetail = () => {
  //Router Hooks
  const history = useHistory();
  const { treatmentId } = useParams();

  //access 'treatment by id' method and set return value in state
  const {
    getTreatmentById,
    deleteTreatment,
    tagTreatmentWithHurt,
    untagHurtFromTreatment
  } = useContext(TreatmentContext);
  const { hurts, getHurtsByPatientId } = useContext(HurtContext);
  const [treatment, setTreatment] = useState({
    added_by: {},
    hurts: [],
    bodypart: {},
    treatmenttype: {},
    links: [],
  });

  // make sure the "selected hurts" displayed are only those belonging to this user
  const selectedHurts = treatment.hurts.filter(
    (h) => h.patient.id === parseInt(localStorage.getItem("patient_id"))
  );

  //delete handler
  const handleDeleteTreatment = async (treatmentId) => {
    await deleteTreatment(treatmentId);
    history.push(`/treatments`);
  };

  useEffect(() => {
    _getTreatmentById();
    _getHurtsByPatientId();
  }, []);

  const _getHurtsByPatientId = () => {
    getHurtsByPatientId(parseInt(localStorage.getItem("patient_id")));
  };

  const _getTreatmentById = async () => {
    const treatment = await getTreatmentById(treatmentId);
    if ("id" in treatment) {
      setTreatment(treatment);
    }
    setIsLoaded(true);
  };

  // handle tagging /untagging hurts; re-fetch patient's hurts first, then this treatment, so the treatment's "selected" is accurate
  const handleAddHurt = (item) => {
    const req_body = { hurt_id: item.id };
    tagTreatmentWithHurt(treatmentId, req_body);
    _getHurtsByPatientId();
    _getTreatmentById();
  };

  const handleRemoveHurt = (e) => {
    const itemId = parseInt(e.target.parentNode.id.split("-")[4])
    const req_body = {hurt_id: itemId}
    untagHurtFromTreatment(treatmentId, req_body)
    _getHurtsByPatientId()
    _getTreatmentById()
  }

  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded && !treatment.id) {
    return <FourOhFourPage />;
  }
  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onEdit={() => history.push(`/treatments/edit/${treatmentId}`)}
          onDelete={() => handleDeleteTreatment(treatment.id)}
          isOwner={treatment.owner}
        >
          <main className="treatmentdetail">
            <div className="treatment">
              <h2>Treatment: {treatment.name}</h2>
              <h3>Bodypart: {treatment.bodypart.name}</h3>
              <h3>Type: {treatment.treatmenttype.name}</h3>
              <div className="treatment__notes">
                <h3>Notes:</h3>
                <p>{treatment.notes}</p>
                <div className="treatment__links">
                  <h3>Links:</h3>
                  {treatment.links.map((l) => {
                    return (
                      <div key={l.id} className="treatment__links__link">
                        <a target="_blank" href={l.linkurl}>
                          {l.linktext}
                        </a>
                      </div>
                    );
                  })}
                </div>
                <h3>Your Tagged Hurts</h3>
                <BadgeField
                  collection={hurts}
                  selected={selectedHurts}
                  badgeText="name"
                  direction="add"
                  onAdd={handleAddHurt}
                />
                <BadgeField
                  detailconfig={{ configkeys: ["date_added", "notes"] }}
                  selected={selectedHurts}
                  badgeText="name"
                  direction="remove"
                  onRemove={handleRemoveHurt}
                />
              </div>
            </div>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentDetail;
