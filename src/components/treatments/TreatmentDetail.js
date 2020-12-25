import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import FourOhFourPage from "../auth/404Page";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { TreatmentContext } from "./TreatmentProvider";
import BadgeField from "../ui/BadgeField";

const TreatmentDetail = () => {
  //Router Hooks
  const history = useHistory();
  const { treatmentId } = useParams();

  //access 'treatment by id' method and set return value in state
  const { getTreatmentById, deleteTreatment } = useContext(TreatmentContext);
  const [treatment, setTreatment] = useState({
    added_by: {},
    hurts: [],
    bodypart: {},
    treatmenttype: {},
    links: [],
  });

  //delete handler
  const handleDeleteTreatment = async (treatmentId) => {
    await deleteTreatment(treatmentId);
    history.push(`/treatments`);
  };

  //check for ID in response (treatment was successfully found)
  useEffect(async () => {
    const treatment = await getTreatmentById(treatmentId);
    if ("id" in treatment) {
      setTreatment(treatment);
    }
    setIsLoaded(true);
  }, []);

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
                <h3>Tagged Hurts</h3>
                <BadgeField selected={treatment.hurts} badgeText="name" />
              </div>
            </div>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentDetail;
