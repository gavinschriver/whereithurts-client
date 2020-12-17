import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { deselectItemById } from "../../utils/helpers";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import BadgeField from "../ui/BadgeField";
import Button from "../ui/Button";
import ShowHideSection from "../ui/ShowHideSection";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { TreatmentContext } from "./TreatmentProvider";

const TreatmentForm = (props) => {
  //access History, Location and Param objects; establish if we're in editMode or not

  //if we're in edit mode, we'll be accessing the values from the treatmentToUpdate, which is loaded into state from the response body,
  // and setting them to the corresponding state variable values (basicFormValues, selectedHurts and selectedLinks)

  const history = useHistory;
  const location = useLocation();
  const { treatmentId } = useParams();

  const editMode = location.pathname.includes("edit");

  //treatment
  const { createTreatment, getTreatmentById, updateTreatment } = useContext(TreatmentContext);
  const [treatmentToUpdate, setTreatmentToUpdate] = useState({
    notes: "",
    name: "",
    treatmenttype: { id: 0 },
    bodypart: { id: 0 },
    hurts: [],
    links: [],
  });

  const [basicFormValues, setBasicFormValues] = useState({
    bodypart_id: "",
    treatmenttype_id: "",
    name: "",
    notes: "",
  });

  const handleBasicFormValueInputChange = (e) => {
    const { name, value } = e.target;
    setBasicFormValues({ ...basicFormValues, [name]: value });
  };

  //handle treatment add or update

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    const newTreatment = {
      name: basicFormValues.name,
      notes: basicFormValues.notes,
      treatmenttype_id: parseInt(basicFormValues.treatmenttype_id),
      bodypart_id: parseInt(basicFormValues.bodypart_id),
      hurt_ids: selectedHurts.map((h) => h.id),
      treatment_links: selectedLinks,
    };
    const createdTreatment = await createTreatment(newTreatment);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    const updatedTreatment = {
      id: treatmentToUpdate.id,
      name: basicFormValues.name,
      notes: basicFormValues.notes,
      bodypart_id: parseInt(basicFormValues.bodypart_id),
      treatmenttype_id: parseInt(basicFormValues.treatmenttype_id),
      hurt_ids: selectedHurts.map((h) => h.id),
      treatment_links: selectedLinks
    }
    await updateTreatment(treatmentId, updatedTreatment)
  };

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

  // links
  const linkTextRef = useRef("");
  const linkURLRef = useRef("");
  const [showAddLinks, setShowAddLinks] = useState(false);
  const [linkIDcount, setLinkIdCount] = useState(0);
  const [selectedLinks, setSelectedLinks] = useState([]);

  // when a link is added, make an object with an Id that's equal to the current linkIdcount plus 1
  const handleAddLink = (e) => {
    const newLink = {
      id: linkIDcount + 1,
      linktext: linkTextRef.current.value,
      linkurl: linkURLRef.current.value,
    };
    setSelectedLinks([...selectedLinks, newLink]);
  };

  //every time selectedlinks changes, where its an addition or removal, increment linkIdcount by 1 so its always unique
  useEffect(() => {
    setLinkIdCount((linkIDcount) => linkIDcount + 1);
  },[selectedLinks])

  const removeLinkById = deselectItemById(selectedLinks, setSelectedLinks);

  // initial hook to get toggleable items by patient_id === added_by_id
  useEffect(async () => {
    await getHurtsByPatientId(localStorage.getItem("patient_id"));
    if (editMode && treatmentId) {
      const treatmentToUpdate = await getTreatmentById(treatmentId);
      setTreatmentToUpdate(treatmentToUpdate);
    }
  }, []);

  //if we're in edit mode, this use effect will read the loaded "treatmentToUpdate" values to set the state values associated w/ each UI
  useEffect(() => {
    if (treatmentToUpdate.hurts) setSelectedHurts(treatmentToUpdate.hurts);
    if (treatmentToUpdate.links) setSelectedLinks(treatmentToUpdate.links);
    setBasicFormValues({
      name: treatmentToUpdate.name,
      notes: treatmentToUpdate.notes,
      treatmenttype_id: treatmentToUpdate.treatmenttype.id,
      bodypart_id: treatmentToUpdate.bodypart.id,
    });
    // set linkIDcount to equal the value of the highest Numerical id in the array of links that come back so we dont get any duplicates
    if (treatmentToUpdate.links) setLinkIdCount(treatmentToUpdate.links.map((tl) => tl.id).sort().reverse()[0])
  }, [treatmentToUpdate]);

  return (
    <BasicPage>
      <div className="basicwrapper">
        <FormPageLayout
          resource="Treatment"
          isEditMode={editMode}
          onClick={editMode ? handleSubmitUpdate : handleSubmitNew}
        >
          <main className="treatmentform">
            <TextInput
              name="name"
              label="Name"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.name}
            />
            <TreatmentTypeSelectBar
              name="treatmenttype_id"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.treatmenttype_id}
            />
            <BodypartSelectBar
              name="bodypart_id"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.bodypart_id}
            />
            <TextArea
              name="notes"
              label="Notes"
              value={basicFormValues.notes}
              onChange={handleBasicFormValueInputChange}
            />
            <HurtToggleGroup
              collection={hurts}
              showing={showAddHurts}
              selected={selectedHurts}
              setShowing={setShowAddHurts}
              onAdd={handleSelectHurt}
              onRemove={deselectHurtById}
            />
            <ShowHideSection
              showhidetext="Links"
              showing={showAddLinks}
              setShowing={setShowAddLinks}
            >
              <div className="linkform">
                <div className="row linkform--row">
                  <fieldset className="linkform__field">
                    <label htmlFor="linktext">Link Text</label>
                    <input ref={linkTextRef} name="linktext" />
                  </fieldset>
                </div>
                <div className="row">
                  <fieldset className="linkform__field">
                    <label htmlFor="linkurl">Link URL</label>
                    <input ref={linkURLRef} name="linkurl" />
                  </fieldset>
                </div>
                <div className="row">
                  <Button onClick={handleAddLink}>Save Link</Button>
                </div>
              </div>
            </ShowHideSection>
            <BadgeField
              selected={selectedLinks}
              badgeText="linktext"
              direction="remove"
              onRemove={removeLinkById}
            />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentForm;
