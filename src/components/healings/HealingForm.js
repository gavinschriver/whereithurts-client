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

  //state value object to load initial values from item to edit
  const [healing, setHealing] = useState({
    treatments: [],
    hurts: [],
    notes: "",
    patient: {},
  });

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

  //display to the user
  const [humanTime, setHumanTime] = useState("00:00");

  // when user manually changes value of total time,
  // convert the input to M:SS, then use convert that val to secs and set it as the timerTotal value of seconds
  const handleSessionTotalChange = (e) => {
    const formatted = formatToMSSTimeString(e.target.value);
    setHumanTime(formatted);
    setTimer((timer) => ({
      ...timer,
      timeTotal: convertTimeStringToSeconds(formatted),
    }));
  };

  //when value of timerTotal changes, update the human time to appropriate format;
  //
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
    if (editMode && healingId) {
      const healing = await getHealingById(healingId);
      if ("id" in healing) {
        setHealing(healing);
      }
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    getTreatmentsByPatientId(localStorage.getItem("patient_id"))
      .then(() => {
        getHurtsByPatientId(localStorage.getItem("patient_id"));
      })
      .then(() => {
        _getInitialValues();
      });
  }, []);

  //if we're in edit mode, read the loaded "healing" values to set the state values associated w/ each UI
  useEffect(() => {
    if (healing.hurts) setSelectedHurts(healing.hurts);
    if (healing.treatments) setSelectedTreatments(healing.treatments);
    if (healing.notes) setNotes(healing.notes);
    if (healing.duration)
      setTimer((timer) => ({ ...timer, timeTotal: healing.duration }));
  }, [healing]);

  //loading state/permissions/404s
  const [isLoaded, setIsLoaded] = useState(false);

  //if the page has loaded AND we're in edit mode AND there's no healing id, its a 404
  if (isLoaded && editMode && !healing.id) {
    return <FourOhFourPage />;
  }

  //if the page has loaded AND we're in edit mode AND theres a healing ID BUT that healing ID isn't that of the current user, return unauthorized
  if (
    isLoaded &&
    editMode &&
    healing.id &&
    !(healing.patient.id === parseInt(localStorage.getItem("patient_id")))
  ) {
    return <UnauthorizedPage />;
  }

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
