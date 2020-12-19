import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { deselectItemById } from "../../utils/helpers";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { HurtContext } from "./HurtProvider";
import "./Hurts.css";

const HurtForm = (props) => {
  //initial info
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));

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
  const handleCheckboxChange = (e) => {
    setCheckBoxValue(!checkBoxValue);
  };

  const handleBasicFormValueChange = (e) => {
    const { name, value } = e.target;
    setBasicFormValues({ ...basicFormValues, [name]: value });
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
            />
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
