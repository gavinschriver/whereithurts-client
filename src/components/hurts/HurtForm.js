import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { buildQueryString, deselectItemById } from "../../utils/helpers";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentControlGroup from "../treatments/TreatmentControlGroup";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { HurtContext } from "./HurtProvider";
import "./Hurts.css";

const HurtForm = () => {
  //initial info
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));

  const location = useLocation();
  const history = useHistory();
  const { hurtId } = useParams();
  const editMode = location.pathname.includes("edit");

  //filters and actions for treatments
  const [bodypartId, setBodypartId] = useState(0);
  const [treatmentTypeId, setTreatmentTypeId] = useState(0);
  const [isTreatmentOwner, setIsTreatmentOwner] = useState(1);
  const [treatmentFilters, setTreatmentFilters] = useState({ owner: 1 });
  const [treatmentSearchTerms, setTreatmentSearchTerms] = useState("");

  const handleChangeTreatmentSearchTerms = (e) => {
    setTreatmentSearchTerms(treatmentSearchTerms);
  };
  const handleSubmitSearchTerms = () => {
    getTreatmentsBySearchTerms(treatmentSearchTerms);
  };

  const handleSelectBodypart = (e) => {
    setBodypartId(e.target.value);
  };

  const handleSelectTreatmentType = (e) => {
    setTreatmentTypeId(e.target.value);
  };

  const handleSelectTreatmentCollection = (e) => {
    setIsTreatmentOwner(e.target.value);
  };

  const handleClearSearchTerms = () => {
    setTreatmentSearchTerms("");
    getTreatmentsByQuerystring(buildQueryString(treatmentFilters));
  };

  useEffect(() => {
    getTreatmentsByQuerystring(buildQueryString(treatmentFilters));
  }, [treatmentFilters]);

  useEffect(() => {
    setTreatmentFilters({
      bodypart_id: parseInt(bodypartId),
      treatmenttype_id: parseInt(treatmentTypeId),
      owner: parseInt(isTreatmentOwner),
    });
  }, [bodypartId, treatmentTypeId, isTreatmentOwner]);

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
    treatments,
    getTreatmentsByPatientId,
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

  //initializer effect to bring in treatments added_by this patient **
  useEffect(() => {
    getTreatmentsByPatientId(current_patient_id).then(() => {
      if (editMode && hurtId) {
        getInitialValues();
      }
    });
  }, []);

  const getInitialValues = async () => {
    const hurt = await getHurtById(hurtId);
    setBasicFormValues({
      name: hurt.name,
      notes: hurt.notes,
      pain_level: hurt.pain_level,
      bodypart_id: hurt.bodypart.id,
      first_update_id: hurt.first_update_id,
    });
    setCheckBoxValue(hurt.is_active);
    setSelectedTreatments(hurt.treatments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout
          resource="Hurt"
          onClick={handleSubmit}
          isEditMode={editMode}
        >
          <main className="hurtform">
            <TextInput
              name="name"
              label="Name"
              value={basicFormValues.name}
              onChange={handleBasicFormValueChange}
            />
            <BodypartSelectBar
              name="bodypart_id"
              onChange={handleBasicFormValueChange}
              value={basicFormValues.bodypart_id}
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
            />
            <TreatmentToggleGroup
              collection={treatments}
              showing={showAddTreatments}
              setShowing={setShowAddTreatments}
              selected={selectedTreatments}
              onAdd={handleSelectTreatment}
              onRemove={deselectTreatmentById}
            >
              <TreatmentControlGroup
                isOwner={isTreatmentOwner}
                changeSearchTerms={handleChangeTreatmentSearchTerms}
                clearSearchTerms={handleClearSearchTerms}
                selectRadioButton={handleSelectTreatmentCollection}
                submitSearchTerms={handleSubmitSearchTerms}
                selectTreatmentType={handleSelectTreatmentType}
                selectBodypart={handleSelectBodypart}
                bodypartId={bodypartId}
                treatmentTypeId={treatmentTypeId}
              />
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
    </BasicPage>
  );
};

export default HurtForm;
