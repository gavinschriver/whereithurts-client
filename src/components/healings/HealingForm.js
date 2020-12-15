import React, { useState, useContext, useEffect } from "react";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import { deselectItemById } from "../../utils/helpers";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import Timer from "../timer/Timer";
import TimerSelectBar from "../timer/TimerSelectBar";
import ShowHideSection from "../ui/ShowHideSection";

const HealingForm = (props) => {
  //treatments
  const { treatments, getTreatmentsByPatientId } = useContext(TreatmentContext);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [showAddTreatments, setShowAddTreatments] = useState(false);
  const handleSelectTreatment = (item) => {
    if (selectedTreatments) {
      setSelectedTreatments([...selectedTreatments, item]);
    } else setSelectedTreatments([item]);
  };
  const deselectTreatmentById = deselectItemById(
    selectedTreatments,
    setSelectedTreatments
  );

  //healings
  const { hurts, getHurtsByPatientId } = useContext(HurtContext);
  const [selectedHurts, setSelectedHurts] = useState([]);
  const [showAddHurts, setShowAddHurts] = useState(false);
  const handleSelectHurt = (item) => {
    if (selectedHurts) {
      setSelectedHurts([...selectedHurts, item]);
    } else setSelectedHurts([item]);
  };
  const deselectHurtById = deselectItemById(selectedHurts, setSelectedHurts);

  //timer
  const [showTimer, setShowTimer] = useState(false)
  const [timer, setTimer] = useState({
    timerVal: 0,
    remaining: 0,
    isActive: false,
    timeTotal: 0,
  });

  const handleTimerChange = (e) => {
    setTimer((timer) => ({
      ...timer,
      remaining: e.target.value,
      timerVal: e.target.value,
    }));
  };

  let editMode;

  // initial hook to get toggleable items by patient_id === added_by_id
  useEffect(async () => {
    await getTreatmentsByPatientId(localStorage.getItem("patient_id"));
    await getHurtsByPatientId(localStorage.getItem("patient_id"));
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Healing" isEditMode={editMode}>
          <main className="healingform">
            <TreatmentToggleGroup
              collection={treatments}
              showing={showAddTreatments}
              selected={selectedTreatments}
              setShowing={setShowAddTreatments}
              onAdd={handleSelectTreatment}
              onRemove={deselectTreatmentById}
            />
            <HurtToggleGroup
              collection={hurts}
              showing={showAddHurts}
              selected={selectedHurts}
              setShowing={setShowAddHurts}
              onAdd={handleSelectHurt}
              onRemove={deselectHurtById}
            />
            <ShowHideSection showing={showTimer} setShowing={setShowTimer} showhidetext="Time" >
              <Timer timer={timer} setTimer={setTimer} />
              <TimerSelectBar onChange={handleTimerChange}  />
            </ShowHideSection>
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingForm;
