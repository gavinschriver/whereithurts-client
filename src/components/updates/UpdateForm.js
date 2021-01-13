import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { UpdateContext } from "./UpdateProvider";
import HurtSelectBar from "../hurts/HurtSelectBar";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import PainLevelSelectBar from "../ui/PainLevelSelectBar";
import TextArea from "../ui/TextArea";
import Alert from "../ui/Alert";
import FourOhFourPage from "../auth/404Page";
import Loader from "../ui/Loader";
import LoadingWrapper from "../ui/LoadingWrapper";

const UpdateForm = () => {
  const [formValues, setFormValues] = useState({ notes: "" });

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
    setIsLoaded(true);
  }, []);

  const getInitialFormValues = async () => {
    const update = await getUpdateById(updateId);
    if ("id" in update) {
      setFormValues({
        hurt_id: update.hurt && update.hurt.id,
        notes: update.notes,
        pain_level: update.pain_level,
        id: update.id,
      });
    } else setIdExists(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (validation()) {
      e.preventDefault();

      if (isEditMode && updateId) {
        await updateUpdate(updateId, formValues);
        history.push(`/updates/${updateId}`);
      } else {
        const newUpdate = await createUpdate(formValues);
        history.push(`/updates/${newUpdate.id}`);
      }
    } else setShowAlert(true);
  };

  //validation

  const validation = () => {
    const hurtId = parseInt(formValues.hurt_id);
    const painLevel = parseInt(formValues.pain_level);
    if (hurtId >= 1 && painLevel >= 1) {
      return true;
    } else return false;
  };

  const alert = <Alert onClose={() => setShowAlert(false)} />;
  const [showAlert, setShowAlert] = useState(false);

  // loading state
  const [isLoaded, setIsLoaded] = useState(false);
  const [idExists, setIdExists] = useState(true);

  const renderContent = () => {
    // if we're either in "New" mode, OR edit mode and id has been established
    if (!isEditMode || formValues.id)
      return (
        <div className="basicwrapper">
          <FormPageLayout
            resource="Update"
            onClick={handleSubmit}
            isEditMode={isEditMode}
            alert={alert}
            showAlert={showAlert}
          >
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
                value={formValues.notes || ""}
              />
              <PainLevelSelectBar
                name="pain_level"
                onChange={handleChange}
                value={formValues.pain_level}
              />
            </main>
          </FormPageLayout>
        </div>
      );
  };

  if (isLoaded) {
    if (!isEditMode || idExists)
      return <BasicPage>{renderContent()}</BasicPage>;
  } else if (isEditMode && !idExists) return <FourOhFourPage />;

  return (
    <LoadingWrapper>
      <Loader />
    </LoadingWrapper>
  );
};

export default UpdateForm;
