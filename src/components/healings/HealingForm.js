import React, { useState, useContext, useEffect } from "react";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import {
  deselectItemById,
  convertSecondsToTimeString,
  formatToMSSTimeString,
  convertTimeStringToSeconds,
  buildQueryString,
} from "../../utils/helpers";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import Timer from "../timer/Timer";
import TimerSelectBar from "../timer/TimerSelectBar";
import ShowHideSection from "../ui/ShowHideSection";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import { HealingContext } from "./HealingProvider";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./Healings.css";
import ControlGroup from "../ui/ControlGroup";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";
import FourOhFourPage from "../auth/404Page";
import LoadingWrapper from "../ui/LoadingWrapper";
import UnauthorizedPage from "../auth/UnauthorizedPage";

const HealingForm = () => {
  //access History, Location and Param objects; establish if we're in editMode or not

  const history = useHistory();
  const location = useLocation();
  const { healingId } = useParams();

  const editMode = location.pathname.includes("edit");

  //filter and search
  const [bodypartId, setBodypartId] = useState(0);
  const [treatmentTypeId, setTreatmentTypeId] = useState(0);
  const [isOwner, setIsOwner] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ owner: 1, page: 1 });

  // TREATMENT SEARCH TERMS CURRENTLY NOT OEPRATIONAL IN THIS FORM
  // const [searchTerms, setSearchTerms] = useState("");

  // const handleChangeSearchTerms = (e) => {
  //   setSearchTerms(e.target.value);
  // };

  // const handleSubmitSearchTerms = () => {
  //   getTreatmentsBySearchTerms(searchTerms);
  // };

  // const handleClearSearchTerms = () => {
  //   setSearchTerms("");
  //   getTreatmentsByQuerystring(buildQueryString(filters));
  // };

  // effect to bring in treatments on page load, intially with only current user's added_by treatments, and then whenever a filter changes
  useEffect(() => {
    getTreatmentsByQuerystring(buildQueryString(filters));
  }, [filters]);

  //when any filter changes, make sure we reset the page to 1
  useEffect(() => {
    setFilters({
      bodypart_id: parseInt(bodypartId),
      treatmenttype_id: parseInt(treatmentTypeId),
      owner: parseInt(isOwner),
      page: 1,
    });
    setCurrentPage(1);
  }, [bodypartId, treatmentTypeId, isOwner]);

  // when the currentPage changes, setFilters to their existing values, but update the 'page' value
  useEffect(() => {
    setFilters({
      ...filters,
      page: currentPage,
    });
  }, [currentPage]);

  const handleRadioButtonChange = (e) => {
    setIsOwner(e.target.value);
  };

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
  const {
    treatmentData,
    getTreatmentsByQuerystring,
    getTreatmentsBySearchTerms,
  } = useContext(TreatmentContext);
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

  // notes
  const [notes, setNotes] = useState("");
  const handleNotesChange = (e) => {
    const { value } = e.target;
    setNotes(value);
  };

  //timer
  const [showTimer, setShowTimer] = useState(false);

  const [timer, setTimer] = useState({
    timerVal: 0,
    remaining: 0,
    isActive: false,
    timeTotal: 0,
    isMuted: true,
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

  // initial hooks to get hurts specific to this user, then get/load the healing if we're in editMode
  const [idExists, setIdExists] = useState(true);

  const _getInitialValues = async () => {
    const healing = await getHealingById(healingId);
    if ("id" in healing) {
      setOwner(healing.owner);
      setSelectedHurts(healing.hurts);
      setSelectedTreatments(healing.treatments);
      setNotes(healing.notes);
      setTimer((timer) => ({ ...timer, timeTotal: healing.duration }));
    } else setIdExists(false);
  };

  // initializer effect brings in only this patient's hurts (new OR edit); treatment filter useEffect brings in relevant treatments
  useEffect(() => {
    getHurtsByPatientId(localStorage.getItem("patient_id")).then(() => {
      if (editMode && healingId) {
        _getInitialValues();
      }
      setIsLoaded(true);
    });
  }, []);

  //loading state/permissions/404s
  const [isLoaded, setIsLoaded] = useState(false);
  const [owner, setOwner] = useState(true);

  const renderForm = () => {
    return (
      <div className="basicwrapper">
        <FormPageLayout
          resource="Healing"
          isEditMode={editMode}
          onClick={handleSubmit}
        >
          <main className="healingform">
            <TreatmentToggleGroup
              collection={treatmentData.treatments}
              showing={showAddTreatments}
              selected={selectedTreatments}
              setShowing={setShowAddTreatments}
              onAdd={handleSelectTreatment}
              onRemove={deselectTreatmentById}
            >
              <ControlGroup>
                <div className="treatments_collection_select">
                  <label htmlFor="owner">Added By You</label>
                  <input
                    type="radio"
                    id="owner"
                    name="collection"
                    value={1}
                    checked={isOwner == 1}
                    onChange={handleRadioButtonChange}
                  />
                  <label htmlFor="owner">From all users</label>
                  <input
                    type="radio"
                    id="all"
                    name="collection"
                    value={0}
                    checked={isOwner == 0}
                    onChange={handleRadioButtonChange}
                  />
                </div>
                <BodypartSelectBar
                  label="Filter by Bodypart: "
                  defaultoptiontext="No filter chosen"
                  onChange={(e) => setBodypartId(e.target.value)}
                  value={bodypartId}
                />
                <TreatmentTypeSelectBar
                  label="Filter by Treatment Type: "
                  defaultoptiontext="No filter chosen"
                  onChange={(e) => setTreatmentTypeId(e.target.value)}
                  value={treatmentTypeId}
                />
              </ControlGroup>
              <Pagination
                page={currentPage}
                totalCount={treatmentData.count}
                pageBack={() => setCurrentPage(currentPage - 1)}
                pageForward={() => setCurrentPage(currentPage + 1)}
              />
            </TreatmentToggleGroup>
            <HurtToggleGroup
              collection={hurts}
              showing={showAddHurts}
              selected={selectedHurts}
              setShowing={setShowAddHurts}
              onAdd={handleSelectHurt}
              onRemove={deselectHurtById}
              detailconfig={{ configkeys: ["date_added", "notes"] }}
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
                label="Edit Time"
                onChange={handleSessionTotalChange}
                value={humanTime}
                extraLabel="mm:ss"
              ></TextInput>
            </ShowHideSection>
            <div className="healingform__time">
              <div className="row align-left">
                <h4>Currently logged: {humanTime}</h4>
              </div>
            </div>
            <h3>Notes</h3>
            <TextArea name="notes" onChange={handleNotesChange} value={notes} />
          </main>
        </FormPageLayout>
      </div>
    );
  };

  if (isLoaded) {
    // in "new mode" OR id DOES exist for editing?
    if (!editMode || idExists) {
      // if "new mode" OR 'owner' is true
      if (!editMode || owner === true) {
        return <BasicPage>{renderForm()}</BasicPage>;
      } else return <UnauthorizedPage />;
    }

    // in "edit" mode BUT no id was found?
    else if (editMode && !idExists) return <FourOhFourPage />;
  }

  return (
    <LoadingWrapper>
      <Loader />
    </LoadingWrapper>
  );
};

export default HealingForm;
