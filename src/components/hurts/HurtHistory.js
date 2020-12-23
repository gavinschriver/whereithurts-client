import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../ui/Button";
import SortHurtHistory from "./SortHurtHistory";

const HurtHistory = (props) => {
  const routeHistory = useHistory();

  const { history, sortValue, handleHistoryItemClick } = props;

  return (
    <div className="history">
      <div className="row">
        <div className="history__heading">
          <h2>History</h2>
        </div>
      </div>
      <SortHurtHistory value={sortValue} />
      <div className="list history--list">
        {history.map((i) => {
          const type = i.history_type;

          const classType = type === "Created on" ? "created" : "entry";

          const resource =
            type === "Update" ? "updates" : "Healing" ? "healings" : "";

          return (
            <div
              className={`row listitem history--listitem history--${classType}`} key={`${i.history_type}-${i.id}`}
            >
              <div className="col">
                <div className="history__heaing">
                  {i.history_type}: {i.date_added}
                </div>
              </div>
              <div className="col">
                <div className="history__action">
                  {classType !== "created" && (
                    <Button
                      onClick={() => routeHistory.push(`/${resource}/${i.id}`)}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HurtHistory;
