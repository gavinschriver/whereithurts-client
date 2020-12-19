import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import BadgeField from "../ui/BadgeField";
import { HurtContext } from "./HurtProvider";

const HurtDetail = () => {
  const history = useHistory();

  const { hurtId } = useParams();

  const { getHurtById } = useContext(HurtContext);

  const [hurt, setHurt] = useState(null);

  const _getHurtById = async (hurtId) => {
    const _hurt = await getHurtById(hurtId);

    setHurt(_hurt);
  };

  useEffect(() => {
    _getHurtById(hurtId);
  }, []);

  if (hurt === null) {
    return <div>Still loading...</div>;
  }

  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onEdit={() => history.push(`/hurts/edit/${hurtId}`)}
        >
          <main className="hurtdetail">
            <h2>Hurt: {hurt.name}</h2>
            <h3>Bodypart: {hurt.bodypart.name}</h3>
            <h3>Starting Pain Level: {hurt.pain_level}</h3>
            <h3>Notes: </h3>
            <p>{hurt.notes}</p>
            <h3>Tagged Treatments:</h3>
            <BadgeField selected={hurt.treatments} badgeText="name" />
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default HurtDetail;
