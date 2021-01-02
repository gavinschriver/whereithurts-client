import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import BadgeField from "../ui/BadgeField";
import Button from "../ui/Button";
import { ProfileContext } from "./ProfileProvider";

const Snapshot = () => {
  const history = useHistory();
  const { getSnapshotByPatientId } = useContext(ProfileContext);
  const current_patient_id = localStorage.getItem("patient_id");

  const [snapshot, setSnapshot] = useState(null);

  const _getSnapshotByPatientId = async (patientId) => {
    const snapshot = await getSnapshotByPatientId(patientId);
    setSnapshot(snapshot);
  };

  useEffect(() => {
    _getSnapshotByPatientId(current_patient_id);
  }, []);

  if (snapshot === null) {
    return <div>Still Loading...</div>;
  }

  return (
    <BasicPage>
      <div className="basicwrapper">
        <main className="snapshot">
          <div className="snapshot__header">
            <h1>Your Snapshot</h1>
            <h3>for the last week</h3>
          </div>
          <div className="snapshot__healingtime">
            <h4>
              Healing Time: {snapshot.recent_healing_time}
            </h4>
          </div>
          <div className="snapshot__treatments">
            <h4>Treatments Used:</h4>
            <BadgeField
              selected={snapshot.recent_treatments}
              badgeText="name"
              detailconfig={{configkeys: ["name", "notes"]}}
            />
            <div className="snapshot__hurts">
              <h4>Hurts Worked On:</h4>
              <div className="list hurts--list">
                {snapshot.recent_hurts.map((h) => {
                  return (
                    <div className="listitem" key={h.id}>
                      <Button onClick={() => history.push(`/hurts/${h.id}`)}>
                        <div className="row space-between">
                          <div className="col">
                            <h3>Name: {h.name}</h3>
                          </div>
                          <div className="col">
                            <h3>Current Pain Level: {h.latest_pain_level}</h3>
                          </div>
                        </div>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </BasicPage>
  );
};

export default Snapshot;
