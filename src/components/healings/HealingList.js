import React, { useEffect, useContext } from "react";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import { HealingContext } from "./HealingProvider";

const HealingList = (props) => {
  const { getHealingData, healingData } = useContext(HealingContext);

  useEffect(async () => {
    await getHealingData();
    console.log(healingData);
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout resource="Healings">
          <div className="healinglist">
            {healingData.healings.map((h) => {
              return (
                <div className="listitem">
                  <div className="listitem--row row">
                    <div className="listitem__date"><h3>{h.added_on}</h3></div>
                    <div className="listitem__subcollection">
                      {h.treatments.map((t) => {
                        return <span className="listitem__subcollection__item">{t.name}</span>;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ListPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingList;
