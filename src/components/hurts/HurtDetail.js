import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import DetailPageLayout from "../layouts/DetailPageLayout";
import BadgeField from "../ui/BadgeField";
import HurtHistory from "./HurtHistory";
import { HurtContext } from "./HurtProvider";
import FourOhFourPage from "../auth/404Page";
import Loader from "../ui/Loader";
import LoadingWrapper from "../ui/LoadingWrapper";
import UnauthorizedPage from "../auth/UnauthorizedPage";
import { toMMDDYYYY } from "../../utils/helpers";

const HurtDetail = () => {
  const history = useHistory();

  const { hurtId } = useParams();

  const { deleteHurt, sortHurtHistory, getHurtById } = useContext(HurtContext);

  const [hurt, setHurt] = useState({
    name: "",
    bodypart: { name: "" },
    pain_level: "",
    notes: "",
    treatments: [],
    history: [],
  });

  // history sort value; initialized with 'newest' first
  const [sortValue, setSortValue] = useState("newest");

  const _sortHurtHistory = async (hurtId, queryString) => {
    const _hurt = await sortHurtHistory(hurtId, queryString);
    if ("id" in hurt) {
      setHurt(_hurt);
    }
  };

  // initializer hooks
  const _getHurtById = async () => {
    const hurt = await getHurtById(hurtId);
    if ("id" in hurt) {
      setHurt(hurt);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    _getHurtById();
  }, []);

  useEffect(() => {
    _sortHurtHistory(hurtId, `order_history=${sortValue}`);
  }, [sortValue]);

  // delete function
  const handleDeleteHurt = async (hurtId) => {
    await deleteHurt(hurtId);
    history.push(`/hurts`);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded && !hurt.id) {
    return <FourOhFourPage />;
  }

  if (isLoaded && hurt.owner === false) {
    return <UnauthorizedPage />
  }

  return (
    <BasicPage>
      {isLoaded ? (
        <div className="basicwrapper">
          <DetailPageLayout
            onEdit={() => history.push(`/hurts/edit/${hurtId}`)}
            onDelete={() => handleDeleteHurt(hurtId)}
            isOwner={hurt.owner}
          >
            <main className="detail hurtdetail">
              <h2>Hurt: {hurt.name}</h2>
              <h3>Bodypart: {hurt.bodypart.name}</h3>
              <img src={hurt.bodypart.hurt_image} />
              <h3>Added on {toMMDDYYYY(hurt.added_on)}</h3>
              <h3>Starting Pain Level: {hurt.pain_level}</h3>
              <h3>Notes: </h3>
              <p>{hurt.notes}</p>
              <h3>Tagged Treatments:</h3>
              <BadgeField
                selected={hurt.treatments}
                badgeText="name"
                detailconfig={{
                  configkeys: ["name","bodypart", "treatmenttype", "notes", "links"],
                }}
              />
            </main>
          </DetailPageLayout>
          <HurtHistory
            history={hurt.history}
            hurtId={hurtId}
            sortValue={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          />
        </div>
      ) : (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      )}
    </BasicPage>
  );
};

export default HurtDetail;
