import React from "react";
import { Link } from "react-router-dom";

const resourceConfig = {
  Hurt: "hurts",
  Healing: "healings",
  Update: "updates",
  Treatment: "treatments",
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="recentactivity">
      <div className="recentactivity__header">
        <h3>Your recent activity</h3>
      </div>
      <div className="recentactivity__list list">
        {activities.map((activity, index) => {
          return (
            <div className="listitem activity" key={index}>
              <div className="row">
                <Link
                  to={`/${resourceConfig[activity.activity_type]}/${
                    activity.id
                  }`}
                >
                  <h4 className="activity__type" style={{ marginRight: "5px" }}>
                    {activity.activity_type}
                  </h4>
                </Link>
                <h4 className="activity__date">
                  added on {activity.date_added}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
