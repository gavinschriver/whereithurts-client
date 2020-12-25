import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import TreatmentControlGroup from "./TreatmentControlGroup";
import ShowHideControls from "../ui/ShowHideControls";
import { TreatmentContext } from "./TreatmentProvider";
import "./Treatments.css";
import { buildQueryString } from "../../utils/helpers";

const TreatmentList = () => {
  const [showControls, setShowControls] = useState(false);
  const [filters, setFilters] = useState({ owner: 1 });
  const [searchTerms, setSearchTerms] = useState("");
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: parseInt(value) });
  };

  const handleClearSearchTerms = () => {
    setSearchTerms("");
    _getTreatmentsByQuerystring();
  };

  const {
    getTreatmentsByQuerystring,
    getTreatmentsBySearchTerms,
    treatments,
  } = useContext(TreatmentContext);

  const history = useHistory();

  const _getTreatmentsByQuerystring = () => {
    getTreatmentsByQuerystring(buildQueryString(filters));
  };

  useEffect(() => {
    _getTreatmentsByQuerystring();
  }, [filters]);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Treatment Library"
          onClick={(e) => {
            e.preventDefault();
            history.push("/treatments/new");
          }}
        >
          <ShowHideControls
            showing={showControls}
            setShowing={() =>
              setShowControls((previousState) => !previousState)
            }
          >
            <TreatmentControlGroup
              handleFilterChange={handleFilterChange}
              isOwner={filters.owner}
              bodypartId={filters.bodypart_id}
              treatmentTypeId={filters.treatmenttype_id}
              changeSearchTerms={(e) => setSearchTerms(e.target.value)}
              submitSearchTerms={() => getTreatmentsBySearchTerms(searchTerms)}
              clearSearchTerms={handleClearSearchTerms}
            />
          </ShowHideControls>
          <div className="treatmentlist">
            {treatments.map((t) => {
              return (
                <div
                  className={`listitem ${t.owner ? `owner--listitem` : ``}`}
                  key={t.id}
                >
                  {t.owner && (
                    <span className="yourtreatment">Added by you</span>
                  )}
                  <Button onClick={() => history.push(`/treatments/${t.id}`)}>
                    <div className="col">
                      <h3>Name: {t.name}</h3>
                      <h3>Bodypart: {t.bodypart.name}</h3>
                    </div>
                    <div className="col" style={{textAlign: `right`}}>
                    <h3>{t.treatmenttype.name}</h3>

                      <div className="listitem__subcollection">
                        {t.hurts.map((h) => {
                          if (
                            h.patient.id ===
                            parseInt(localStorage.getItem("patient_id"))
                          ) {
                            return (
                              <span
                                key={h.id}
                                className="listitem__subcollection__item"
                              >
                                {h.name}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentList;
