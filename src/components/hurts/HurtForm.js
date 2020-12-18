import React, { useContext, useEffect, useState } from "react";
import { deselectItemById } from "../../utils/helpers";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import { TreatmentContext } from "../treatments/TreatmentProvider";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import "./Hurts.css";

const HurtForm = (props) => {
  const current_patient_id = parseInt(localStorage.getItem("patient_id"));

  //hurt
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

  //initializer effect to bring in treatments
  useEffect(() => {
    getTreatmentsByPatientId(current_patient_id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hurt = {
      name: basicFormValues.name,
      bodypart_id: basicFormValues.bodypart_id,
      pain_level: basicFormValues.pain_level,
      treatment_ids: selectedTreatments.map((st) => st.id),
      active: checkBoxValue,
    };
    console.log(hurt);
  };

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Hurt" onClick={handleSubmit}>
          <main className="hurtform">
            <TextInput
              name="name"
              label="Name"
              value={basicFormValues.name}
              onChange={handleBasicFormValueChange}
            />
            <BodypartSelectBar />
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
