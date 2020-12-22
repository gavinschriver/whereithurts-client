import React, { useState, useContext, useEffect, useRef } from "react";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import {
  deselectItemById,
  convertSecondsToTimeString,
  formatToMSSTimeString,
  convertTimeStringToSeconds,
} from "../../utils/helpers";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import Timer from "../timer/Timer";
import TimerSelectBar from "../timer/TimerSelectBar";
import ShowHideSection from "../ui/ShowHideSection";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { HealingContext } from "./HealingProvider";
import { useHistory, useLocation, useParams } from "react-router-dom";
import UnauthorizedPage from "../auth/UnauthorizedPage";
import FourOhFourPage from "../auth/404Page";

const HealingForm = () => {
  //access History, Location and Param objects; establish if we're in editMode or not

  const history = useHistory();
  const location = useLocation();
  const { healingId } = useParams();

  const editMode = location.pathname.includes("edit");

  //healing
  const { getHealingById, createHealing, updateHealing } = useContext(
    HealingContext
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHealing = {
      duration: timer.timeTotal,
      treatment_ids: selectedTreatments.map((t) => t.id),
      hurt_ids: selectedHurts.map((h) => h.id),
      notes: notes,
    };
    if (editMode) {
      await updateHealing(healingId, newHealing);
    } else await createHealing(newHealing);
    history.push(`/healings`);
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

  // change to timer SelectBar
  const handleTimerChange = (e) => {
    setTimer((timer) => ({
      ...timer,
      remaining: e.target.value,
      timerVal: e.target.value,
    }));
  };

  const [humanTime, setHumanTime] = useState("00:00");

  const handleSessionTotalChange = (e) => {
    const formatted = formatToMSSTimeString(e.target.value);
    setHumanTime(formatted);
    setTimer((timer) => ({
      ...timer,
      timeTotal: convertTimeStringToSeconds(formatted),
    }));
  };

  useEffect(() => {
    setHumanTime(convertSecondsToTimeString(timer.timeTotal));
  }, [timer.timeTotal]);


  // notes
  const [notes, setNotes] = useState("");
  const handleNotesChange = (e) => {
    const { value } = e.target;
    setNotes(value);
  };

  // initial hooks to get toggleable items by patient_id === added_by_id, then get/load the healing if we're in editMode
  const _getInitialValues = async () => {
      const healing = await getHealingById(healingId);
      if ("id" in healing) {
        setSelectedHurts(healing.hurts)
        setSelectedTreatments(healing.treatments)
        setNotes(healing.notes)
        setTimer((timer) => ({...timer, timeTotal: healing.duration}))
      }
  };

  useEffect(() => {
    getTreatmentsByPatientId(localStorage.getItem("patient_id"))
      .then(() => {
        getHurtsByPatientId(localStorage.getItem("patient_id"));
      })
      .then(() => {
        if (editMode && healingId) {
          _getInitialValues();
        }
        setIsLoaded(true)
      });
  }, []);

  //loading state/permissions/404s
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BasicPage>
      {isLoaded && (
        <div className="basicwrapper">
          <FormPageLayout
            resource="Healing"
            isEditMode={editMode}
            onClick={handleSubmit}
          >
            <main className="healingform">
              <TreatmentToggleGroup
                collection={treatments}
                showing={showAddTreatments}
                selected={selectedTreatments}
                setShowing={setShowAddTreatments}
                onAdd={handleSelectTreatment}
                onRemove={deselectTreatmentById}
              ></TreatmentToggleGroup>
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
                  type="text"
                  name="sessionTotal"
                  label="Add or Edit Time"
                  onChange={handleSessionTotalChange}
                  value={humanTime}
                />
              </ShowHideSection>
              <div className="row" style={{ justifyContent: `flex-start` }}>
                <span>
                  Currently logged time: {humanTime} -- in seconds?{" "}
                  {timer.timeTotal}
                </span>
              </div>
              <h3>Notes</h3>
              <TextArea
                name="notes"
                onChange={handleNotesChange}
                value={notes}
              />
            </main>
          </FormPageLayout>
        </div>
      )}
    </BasicPage>
  );
};

export default HealingForm;

// working verion value for TextInput - timer.timeTotal
