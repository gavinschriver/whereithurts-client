import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import { UpdateContext } from "./UpdateProvider";
import "./Updates.css"

const UpdateDetail = () => {
  const history = useHistory();

  const { updateId } = useParams();

  const { getUpdateById, deleteUpdate } = useContext(UpdateContext);

  const [update, setUpdate] = useState({
    hurt: {},
    date_added: "",
    notes: "",
    pain_level: "",
    pain_level_difference: "",
  });

  const _getUpdateById = async () => {
    const _update = await getUpdateById(updateId);
    if ("id" in _update) {
      setUpdate(_update);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    _getUpdateById(updateId);
  }, []);

  const handleDeleteUpdate = async (updateId) => {
    await deleteUpdate(updateId);
    history.push(`/updates`);
  };
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BasicPage>
      {isLoaded ? (
        <div className="basicwrapper">
          <DetailPageLayout
            onEdit={() => history.push(`/updates/edit/${updateId}`)}
            onDelete={() => handleDeleteUpdate(updateId)}
            isOwner={true}
          >
            <main className="updatedetail">
              <h2 className="name updatedetail__name">
                Update for: <Link to={`/hurts/${update.hurt.id}`}>{update.hurt.name}</Link>
              </h2>
              <h3 className="date updatedetail__date">
                Date: {update.date_added}
              </h3>
              <h3 className="notes updatedetail__notes">Notes:</h3>
              <p>{update.notes}</p>
              <div className="row space-between">
                <h3 className="updatedetail__painlevel">
                  Pain Level: {update.pain_level}
                </h3>
                <h4 className="updatedetail__painleveldifference">
                  {update.pain_level_difference}
                </h4>
              </div>
            </main>
          </DetailPageLayout>
        </div>
      ) : (
        <div>LOADING</div>
      )}
    </BasicPage>
  );
};

export default UpdateDetail;
