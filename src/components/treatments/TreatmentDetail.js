import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import FourOhFourPage from "../auth/404Page";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { TreatmentContext } from "./TreatmentProvider";
import BadgeField from "../ui/BadgeField";
import { HurtContext } from "../hurts/HurtProvider";
import ShowHideSection from "../ui/ShowHideSection";
import UnauthorizedPage from "../auth/UnauthorizedPage";
import LoadingWrapper from "../ui/LoadingWrapper";
import Loader from "../ui/Loader"

const TreatmentDetail = () => {
  //Router Hooks
  const history = useHistory();
  const { treatmentId } = useParams();

  //access 'treatment by id' method and set return value in state
  const {
    getTreatmentById,
    deleteTreatment,
    tagTreatmentWithHurt,
    untagHurtFromTreatment,
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
    const itemId = parseInt(e.target.parentNode.id.split("-")[4]);
    const req_body = { hurt_id: itemId };
    untagHurtFromTreatment(treatmentId, req_body);
    _getTreatmentById();
  };

  const [showAddHurts, setShowAddHurts] = useState(false);
  const hanldeShowAddHurts = () => setShowAddHurts((prevstate) => !prevstate);

  // initial effect on pageload
  useEffect(() => {
    _getTreatmentById();
    _getHurtsByPatientId();
  }, []);

  const visibility = treatment.public ? "Public" : "Private";

  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded && treatment.owner === false && treatment.public === false) {
    return <UnauthorizedPage />;
  }

  if (isLoaded && !treatment.id) {
    return <FourOhFourPage />;
  }
  return (
    <BasicPage>
      {isLoaded ? (
        <div className="basicwrapper">
          <DetailPageLayout
            onEdit={() => history.push(`/treatments/edit/${treatmentId}`)}
            onDelete={() => handleDeleteTreatment(treatment.id)}
            isOwner={treatment.owner}
          >
            <main className="detail treatmentdetail">
              <div className="treatmentdetail__header header--detail">
                <div className="row">
                  <h3 className="treatmentdetail__owner">
                    {treatment.owner
                      ? "Your Treatment"
                      : `Added by ${treatment.added_by.username}`}{" "}
                  </h3>
                  {treatment.owner && (
                    <h3
                      className={`treatmentdetail__public_private ${visibility}`}
                    >
                      {visibility}
                    </h3>
                  )}
                </div>
              </div>
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
                <ShowHideSection
                  showing={showAddHurts}
                  setShowing={hanldeShowAddHurts}
                  showhidetext="Your Tagged Hurts"
                >
                  <BadgeField
                    collection={hurts}
                    selected={selectedHurts}
                    badgeText="name"
                    direction="add"
                    onAdd={handleAddHurt}
                    detailconfig={{ configkeys: ["name","date_added", "notes"] }}
                    missingText={<span>Nothing here, <Link to="/hurts/new">add more Hurts</Link> to get started</span>}
                  />
                </ShowHideSection>
                <BadgeField
                  detailconfig={{ configkeys: ["name","date_added", "notes"] }}
                  selected={selectedHurts}
                  badgeText="name"
                  direction="remove"
                  onRemove={handleRemoveHurt}
                />
              </div>
            </main>
          </DetailPageLayout>
        </div>
      ) : (
        <LoadingWrapper>
          <Loader/>
        </LoadingWrapper>
      )}
    </BasicPage>
  );
};

export default TreatmentDetail;
