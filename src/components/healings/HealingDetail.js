import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { secondsToRoundedMinutes } from "../../utils/helpers";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import BadgeField from "../ui/BadgeField";
import { HealingContext } from "./HealingProvider";

const HealingDetail = (props) => {
  //Router Hooks
  const history = useHistory();
  const { healingId } = useParams();

  //access 'healing by id' method and set return value in state
  const { getHealingById } = useContext(HealingContext);
  const [healing, setHealing] = useState({ treatments: [], hurts: [] });

  //pull in healing on page load when healingId is detected from params
  useEffect(async () => {
    const healing = await getHealingById(healingId);
    setHealing(healing);
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onClick={() => history.push(`/healings/edit/${healing.id}`)}
        >
          <main className="healingdetail">
            <div className="healing">
              <h1>Healing on {healing.date_added}</h1>
              <h3>
                Time Spent: {secondsToRoundedMinutes(healing.duration)} minutes
              </h3>
              <div className="healing__notes">
                <h3>Notes:</h3>
                <p>{healing.notes}</p>
              </div>
              <div className="healing__treatments">
                <h3>Tagged Treatments:</h3>
                <BadgeField selected={healing.treatments} badgeText="name" />
              </div>
              <h3>Tagged Hurts:</h3>
              <BadgeField selected={healing.hurts} badgeText="name" />
            </div>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingDetail;
