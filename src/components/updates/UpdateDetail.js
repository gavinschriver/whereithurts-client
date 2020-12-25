import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { UpdateContext } from "./UpdateProvider";

const UpdateDetail = () => {
  const history = useHistory();

  const { updateId } = useParams();

  const { getUpdateById, deleteUpdate } = useContext(UpdateContext);

  const [update, setUpdate] = useState(null);

  const _getUpdateById = async (updateId) => {
    const _update = await getUpdateById(updateId);
    setUpdate(_update);
  };

  const handleDeleteUpdate = async (updateId) => {
    await deleteUpdate(updateId)
    history.push(`/updates`)
  }

  useEffect(() => {
    _getUpdateById(updateId);
  }, []);

  if (update === null) {
    return <div>Still loading...</div>;
  }

  return (
    <BasicPage>
      <div className="basicwrapper">
        <DetailPageLayout
          onEdit={() => history.push(`/updates/edit/${updateId}`)}
          onDelete={() => handleDeleteUpdate(updateId)}
          isOwner={true}
        >
          <main className="updatedetail">
            <h2 className="name updatedetail__name">Update for: {update.hurt.name}</h2>
            <h3 className="date updatedetail__date">Date: {update.date_added}</h3>
            <h3 className="notes updatedetail__notes">Notes:</h3>
            <p>{update.notes}</p>
            <div className="row space-between">
              <h3 className="updatedetail__painlevel">Pain Level: {update.pain_level}</h3>
                <h4 className="updatedetail__painleveldifference">{update.pain_level_difference}</h4>
            </div>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default UpdateDetail;
