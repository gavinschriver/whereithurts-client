import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { secondsToRoundedMinutes } from "../../utils/helpers";
import FourOhFourPage from "../auth/404Page";
import UnauthorizedPage from "../auth/UnauthorizedPage";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import BadgeField from "../ui/BadgeField";
import { HealingContext } from "./HealingProvider";

const HealingDetail = () => {
  //Router Hooks
  const history = useHistory();
  const { healingId } = useParams();

  //access 'healing by id' method and set return value in state
  const { getHealingById, deleteHealing } = useContext(HealingContext);
  const [healing, setHealing] = useState({
    patient: {},
    treatments: [],
    hurts: [],
  });

  //delete handler
  const handleDeleteHealing = async (healingId) => {
    await deleteHealing(healingId);
    history.push(`/healings`);
  };

  // pull in healing on page load when healingId is detected from params
  useEffect(() => {
    _getHealingById();
  }, []);

  const _getHealingById = async () => {
    const healing = await getHealingById(healingId);
    if ("id" in healing) {
      setHealing(healing);
    }
    setIsLoaded(true);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded && !healing.id) {
    return <FourOhFourPage />;
  }

  if (isLoaded && healing.owner === false) {
    return <UnauthorizedPage />;
  }

  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onEdit={() => history.push(`/healings/edit/${healing.id}`)}
          onDelete={() => handleDeleteHealing(healing.id)}
          isOwner={true}
        >
          <main className="detail healingdetail">
            <div className="healing">
              <h1>Healing on {healing.date_added}</h1>
              <h3>
                Time Spent:{" "}
                {healing.duration &&
                  `${secondsToRoundedMinutes(healing.duration)} minutes`}
              </h3>
              <div className="healing__notes">
                <h3>Notes:</h3>
                <p>{healing.notes}</p>
              </div>
              <div className="healing__treatments">
                <h3>Tagged Treatments:</h3>
                <BadgeField
                  selected={healing.treatments}
                  badgeText="name"
                  detailconfig={{
                    configkeys: [
                      "name",
                      "added_by",
                      "bodypart",
                      "treatmenttype",
                      "notes",
                      "links",
                    ],
                  }}
                />
              </div>
              <h3>Your Tagged Hurts:</h3>
              <BadgeField
                selected={healing.hurts}
                badgeText="name"
                detailconfig={{ configkeys: ["name", "bodypart", "date_added", "latest_pain_level", "notes"] }}
              />
            </div>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingDetail;
