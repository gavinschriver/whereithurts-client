import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { UpdateContext } from "./UpdateProvider";

const UpdateDetail = () => {
  const history = useHistory();

  const { updateId } = useParams();

  const { getUpdateById } = useContext(UpdateContext);

  const [update, setUpdate] = useState(null);

  const _getUpdateById = async (updateId) => {
    const _update = await getUpdateById(updateId);
    setUpdate(_update);
  };

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
        >
                  <main className="updatedetail">
                      <h2>Update for: {update.hurt.name}</h2>
                      <h3>Date: {update.date_added}</h3>
                      <h3>Notes:</h3>
                      <p>{update.notes}</p>
                      <h3>Pain Level: {update.pain_level}</h3>
          </main>
        </DetailPageLayout>
      </div>
    </BasicPage>
  );
};

export default UpdateDetail;
