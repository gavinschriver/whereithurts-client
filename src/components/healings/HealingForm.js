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
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { HealingContext } from "./HealingProvider";
import { useHistory } from "react-router-dom";

const HealingForm = (props) => {

  //invoke History object 
  const history = useHistory()

  //healing
  const { getHealingById, createHealing } = useContext(HealingContext)
  const [healing, setHealing] = useState({treatments: [], hurts: [], notes:''})

  const handleSubmitNew = async () => {
    const newHealing = {
      duration: timer.timeTotal,
      treatment_ids: selectedTreatments.map((t) => t.id),
      hurt_ids: selectedHurts.map((h) => h.id),
      notes: notes
    };

    const createdHealing = await createHealing(newHealing);
    history.push(`${createdHealing.id}`)
  };

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

  //hurts
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
  const [showTimer, setShowTimer] = useState(false);

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

  const handleSessionTotalChange = (e) => {
    let newTotal = parseInt(e.target.value);
    if (isNaN(newTotal)) newTotal = 0;
    setTimer((timer) => ({
      ...timer,
      timeTotal: newTotal,
    }));
  };

  // notes
  const [notes, setNotes] = useState('')
  const handleNotesChange = (e) => {
    const { value } = e.target
    setNotes(value)
  }

  const editMode = false

  // initial hook to get toggleable items by patient_id === added_by_id
  useEffect(async () => {
    await getTreatmentsByPatientId(localStorage.getItem("patient_id"));
    await getHurtsByPatientId(localStorage.getItem("patient_id"));
    if (editMode) {
      const healing = await getHealingById(1);
      setHealing(healing)
    }
  }, []);

  useEffect(() => {
    if (healing.hurts) setSelectedHurts(healing.hurts);
    if (healing.treatments) setSelectedTreatments(healing.treatments);
    if (healing.duration)
      setTimer((timer) => ({ ...timer, timeTotal: healing.duration }));
  }, [healing]);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Healing" isEditMode={editMode} onClick={handleSubmitNew}>
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
            <ShowHideSection
              showing={showTimer}
              setShowing={setShowTimer}
              showhidetext="Time"
            >
              <TimerSelectBar onChange={handleTimerChange} />
              <Timer timer={timer} setTimer={setTimer} />
              <TextInput
                type="number"
                name="sessionTotal"
                label="Add or Edit Time"
                onChange={handleSessionTotalChange}
                value={timer.timeTotal || ""}
              ></TextInput>
            </ShowHideSection>
            <div className="row" style={{justifyContent: `flex-start`}}>
              <span>Currently logged time: {timer.timeTotal}</span>
            </div>
            <h3>Notes</h3>
            <TextArea name="notes" onChange={handleNotesChange} value={notes} />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingForm;
