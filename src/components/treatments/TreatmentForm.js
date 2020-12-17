import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import TextInput from "../ui/TextInput";

const TreatmentForm = (props) => {
  //access History, Location and Param objects; establish if we're in editMode or not

  const history = useHistory;
  const location = useLocation();
  const { treatmentId } = useParams();

  const editMode = location.pathname.includes("edit");

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Treatment" isEditMode={editMode}>
          <main className="treatmentform">
            <TextInput name="name" label="Name" />
            <TreatmentTypeSelectBar />
            <BodypartSelectBar/>
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentForm;
