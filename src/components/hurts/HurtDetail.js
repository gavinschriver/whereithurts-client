import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import BadgeField from "../ui/BadgeField";
import HurtHistory from "./HurtHistory";
import { HurtContext } from "./HurtProvider";

const HurtDetail = () => {
  const history = useHistory();

  const { hurtId } = useParams();

  const { deleteHurt, sortHurtHistory } = useContext(HurtContext);

  const [hurt, setHurt] = useState(null);

  // history sort value; initialized with 'newest' first 
  const [sortValue, setSortValue] = useState('newest')

  const _sortHurtHistory = async (hurtId, queryString) => {
    const _hurt = await sortHurtHistory(hurtId, queryString);
    setHurt(_hurt);
  };

  useEffect(() => {
    _sortHurtHistory(hurtId, `order_history=${sortValue}`)
  }, [sortValue])

  // delete function
  const handleDeleteHurt = async (hurtId) => {
    await deleteHurt(hurtId);
    history.push(`/hurts`);
  };

  if (hurt === null) {
    return <div>Still loading...</div>;
  }

  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onEdit={() => history.push(`/hurts/edit/${hurtId}`)}
          onDelete={() => handleDeleteHurt(hurtId)}
          isOwner={hurt.owner}
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
        <HurtHistory
          history={hurt.history}
          hurtId={hurtId}
          sortValue={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        />
      </div>
    </BasicPage>
  );
};

export default HurtDetail;
