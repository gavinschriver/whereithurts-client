import React, { useState } from "react";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentToggleGroup from "../treatments/TreatmentToggleGroup";

const HealingForm = (props) => {
  let editMode;

  const [showAddTreatments, setShowAddTreatments] = useState(false);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Healing" isEditMode={editMode}>
                  <main className="healingform">
                      <TreatmentToggleGroup showing={showAddTreatments} setShowing={setShowAddTreatments} />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default HealingForm;
