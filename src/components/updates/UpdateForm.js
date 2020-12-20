import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { UpdateContext } from "./UpdateProvider";
import HurtSelectBar from "../hurts/HurtSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import TextArea from "../ui/TextArea";

const UpdateForm = () => {
  const [formValues, setFormValues] = useState({});

  const history = useHistory();
  const location = useLocation();
  const { updateId } = useParams();

  const { createUpdate, getUpdateById, updateUpdate } = useContext(
    UpdateContext
  );

  const isEditMode = location.pathname.includes("edit");

  useEffect(() => {
    if (isEditMode && updateId) {
      getInitialFormValues();
    }
  }, []);

  const getInitialFormValues = async () => {
    const update = await getUpdateById(updateId);
    setFormValues({
      hurt_id: update.hurt && update.hurt.id,
      notes: update.notes,
      pain_level: update.pain_level,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode && updateId) {
      await updateUpdate(updateId, formValues);
      history.push(`/updates/${updateId}`);
    } else {
      await createUpdate(formValues);
      history.push("/updates");
    }
  };

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout resource="Update" onClick={handleSubmit} isEditMode={isEditMode}>
          <main className="updateform">
            <HurtSelectBar
              name="hurt_id"
              onChange={handleChange}
              value={formValues.hurt_id}
            />
            <TextArea
              label="Notes"
              name="notes"
              onChange={handleChange}
              value={formValues.notes}
            />
            <PainLevelSelectBar
              name="pain_level"
              onChange={handleChange}
              value={formValues.pain_level}
            />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default UpdateForm;
