import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import ListPageLayout from "../layouts/ListPage";
import Button from "../ui/Button";
import { HealingContext } from "./HealingProvider";

const HealingList = (props) => {
  const { getHealingData, healingData } = useContext(HealingContext);

  const history = useHistory();

  useEffect(async () => {
    await getHealingData();
    console.log(healingData);
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <ListPageLayout
          resource="Healings"
          onClick={(e) => {
            e.preventDefault();
            history.push("/healings/new");
          }}
        >
          <div className="healinglist">
            {healingData.healings.map((h) => {
              return (
                <div className="listitem">
                  <Button>
                    <div className="col">
                      <h3>Date: {h.date_added}</h3>

                      <h3>Time spent: {Math.floor(h.duration / 60)} minutes</h3>
                    </div>
                    <div className="listitem__subcollection">
                      {h.treatments.map((t) => {
                        return (
                          <span className="listitem__subcollection__item">
                            {t.name}
                          </span>
                        );
                      })}
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

export default HealingList;
