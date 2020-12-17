import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { current_patient_id, deselectItemById } from "../../utils/helpers";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

const TreatmentForm = (props) => {
  //access History, Location and Param objects; establish if we're in editMode or not

  const history = useHistory;
  const location = useLocation();
  const { treatmentId } = useParams();

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

  const editMode = location.pathname.includes("edit");

  useEffect(async () => {
    await getHurtsByPatientId(current_patient_id);
  }, []);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Treatment" isEditMode={editMode}>
          <main className="treatmentform">
            <TextInput name="name" label="Name" />
            <TreatmentTypeSelectBar />
            <BodypartSelectBar />
            <TextArea name="notes" label="Notes" />
            <HurtToggleGroup
              collection={hurts}
              showing={showAddHurts}
              selected={selectedHurts}
              setShowing={setShowAddHurts}
              onAdd={handleSelectHurt}
              onRemove={deselectHurtById}
            />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentForm;
