import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { availableOnPage, buildQueryString, deselectItemById } from "../../utils/helpers";
import FourOhFourPage from "../auth/404Page";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentControlGroup from "../treatments/TreatmentControlGroup";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import Alert from "../ui/Alert";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import SearchBar from "../ui/SearchBar";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { HurtContext } from "./HurtProvider";
import "./Hurts.css";

const HurtForm = () => {
  //initial info
  const location = useLocation();
  const history = useHistory();
  const { hurtId } = useParams();
  const editMode = location.pathname.includes("edit");

  //hurt
  const { createHurt, getHurtById, updateHurt } = useContext(HurtContext);
  const [basicFormValues, setBasicFormValues] = useState({
    name: "",
    bodypart_id: 0,
    notes: "",
    pain_level: 0,
  });
  const [checkBoxValue, setCheckBoxValue] = useState(true);
  const handleCheckboxChange = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  const handleBasicFormValueChange = (e) => {
    const { name, value } = e.target;
    setBasicFormValues({ ...basicFormValues, [name]: value });
  };

  //treatments
  const {
    treatmentData,
    getTreatmentsBySearchTerms,
    getTreatmentsByQuerystring,
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

  //filters treamtents
  const [treatmentFilters, setTreatmentFilters] = useState({
    owner: 1,
    page: 1,
  });

  const [treatmentSearchTerms, setTreatmentSearchTerms] = useState("");
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTreatmentFilters({ ...treatmentFilters, [name]: parseInt(value) });
  };

  // treatment search terms
  const handleChangeTreatmentSearchTerms = (e) => {
    setTreatmentSearchTerms(e.target.value);
  };
  const handleSubmitSearchTerms = () => {
    getTreatmentsBySearchTerms(treatmentSearchTerms);
  };

  //search terms being cleared should trigger a reset to whatever the current state of the filters would return
  const handleClearSearchTerms = () => {
    setTreatmentSearchTerms("");
    getTreatmentsByQuerystring(buildQueryString(treatmentFilters));
  };

  // query treatments by filters on filter change (always set page back to 1); this will also initialize by whatever the filters are first set to
  useEffect(() => {
    setTreatmentFilters({ ...treatmentFilters, page: 1 });
    getTreatmentsByQuerystring(
      buildQueryString({ ...treatmentFilters, page: 1 })
    );
  }, [
    treatmentFilters.owner,
    treatmentFilters.bodypart_id,
    treatmentFilters.treatmenttype_id,
  ]);

  //handle pagination change by getting treatmentFilters including the most recently updated page
  useEffect(() => {
    getTreatmentsByQuerystring(buildQueryString(treatmentFilters));
  }, [treatmentFilters.page]);

  //initializer effect to bring in relevant resource if in edit mode **
  useEffect(() => {
    if (editMode && hurtId) {
      getInitialValues();
    }
    setIsLoaded(true);
  }, []);

  const getInitialValues = async () => {
    const hurt = await getHurtById(hurtId);
    if ("id" in hurt) {
      setBasicFormValues({
        name: hurt.name,
        notes: hurt.notes,
        pain_level: hurt.pain_level,
        bodypart_id: hurt.bodypart.id,
        first_update_id: hurt.first_update_id,
      });
      setCheckBoxValue(hurt.is_active);
      setSelectedTreatments(hurt.treatments);
    } else setIdExists(false);
  };

  //validation
  const [showAlert, setShowAlert] = useState(false);

  const validate = () => {
    const hurtName = basicFormValues.name.trim();
    const painLevel = parseInt(basicFormValues.pain_level);
    const bodypartId = parseInt(basicFormValues.bodypart_id);
    if (painLevel >= 1 && bodypartId >= 1 && hurtName != "") {
      return true;
    }
    return false;
  };

  const alert = <Alert onClose={() => setShowAlert(false)} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const hurtToSave = {
        name: basicFormValues.name,
        bodypart_id: parseInt(basicFormValues.bodypart_id),
        pain_level: parseInt(basicFormValues.pain_level),
        treatment_ids: selectedTreatments.map((st) => st.id),
        notes: basicFormValues.notes,
        is_active: checkBoxValue,
        first_update_id: basicFormValues.first_update_id,
      };

      if (editMode && hurtId) {
        await updateHurt(hurtId, hurtToSave);
        history.push(`/hurts`);
      } else {
        await createHurt(hurtToSave);
        history.push(`/hurts`);
      }
    } else setShowAlert(true);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [idExists, setIdExists] = useState(true);

  const renderForm = () => {
    return (
      <div className="basicwrapper">
        <FormPageLayout
          resource="Hurt"
          onClick={handleSubmit}
          isEditMode={editMode}
          alert={alert}
          showAlert={showAlert}
        >
          <main className="hurtform">
            <TextInput
              name="name"
              label="Name"
              value={basicFormValues.name}
              onChange={handleBasicFormValueChange}
              isrequired={
                showAlert && basicFormValues.name.trim() === ""
                  ? "true"
                  : "false"
              }
            />
            <BodypartSelectBar
              name="bodypart_id"
              onChange={handleBasicFormValueChange}
              value={basicFormValues.bodypart_id}
              isrequired={
                showAlert && !(basicFormValues.bodypart_id >= 1)
                  ? "true"
                  : "false"
              }
            />
            <TextArea
              name="notes"
              label="Notes"
              value={basicFormValues.notes}
              onChange={handleBasicFormValueChange}
            />
            <PainLevelSelectBar
              name="pain_level"
              value={basicFormValues.pain_level}
              onChange={handleBasicFormValueChange}
              isrequired={
                showAlert && !(basicFormValues.pain_level >= 1)
                  ? "true"
                  : "false"
              }
            />
            <TreatmentToggleGroup
              collection={treatmentData.treatments}
              showing={showAddTreatments}
              selected={selectedTreatments}
              setShowing={setShowAddTreatments}
              onAdd={handleSelectTreatment}
              onRemove={deselectTreatmentById}
            >
              <TreatmentControlGroup
                handleFilterChange={handleFilterChange}
                isOwner={treatmentFilters.owner}
                treatmentTypeId={treatmentFilters.treatmenttype_id}
                bodypartId={treatmentFilters.bodypart_id}
              >
                <Pagination
                  page={treatmentFilters.page}
                  totalCount={treatmentData.count}
                  availableOnPage={availableOnPage(
                    treatmentData.treatments,
                    selectedTreatments
                  )}
                  pageBack={() =>
                    setTreatmentFilters({
                      ...treatmentFilters,
                      page: treatmentFilters.page - 1,
                    })
                  }
                  pageForward={() =>
                    setTreatmentFilters({
                      ...treatmentFilters,
                      page: treatmentFilters.page + 1,
                    })
                  }
                />
              </TreatmentControlGroup>
            </TreatmentToggleGroup>
            <fieldset className="hurtstatustoggle">
              <label htmlFor="active">Active?</label>
              <input
                type="checkbox"
                name="active"
                onChange={handleCheckboxChange}
                checked={checkBoxValue}
                value={checkBoxValue ? "true" : "false"}
              />
            </fieldset>
          </main>
        </FormPageLayout>
      </div>
    );
  };

  if (isLoaded) {
    if (!editMode || idExists) return <BasicPage>{renderForm()}</BasicPage>;
    else if (editMode || !idExists) return <FourOhFourPage />;
  }
  return <Loader />;
};

export default HurtForm;
