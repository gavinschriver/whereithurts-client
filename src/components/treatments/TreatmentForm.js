import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { current_patient_id, deselectItemById } from "../../utils/helpers";
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

const TreatmentForm = (props) => {
  //access History, Location and Param objects; establish if we're in editMode or not

  const history = useHistory;
  const location = useLocation();
  const { treatmentId } = useParams();

  const editMode = location.pathname.includes("edit");

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
  const [linkIDcount, setLinkIdCount] = useState(0)
  const [selectedLinks, setSelectedLinks] = useState([])

  const handleAddLink = (e) => {
    const newLink = {
      id: linkIDcount + 1,
      linktext: linkTextRef.current.value,
      linkurl: linkURLRef.current.value,
    };
    setSelectedLinks([...selectedLinks, newLink])
    setLinkIdCount((linkIDcount) => (linkIDcount + 1))
  };

  const removeLinkById = deselectItemById(selectedLinks, setSelectedLinks)

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
            <ShowHideSection showhidetext="Links" showing={showAddLinks} setShowing={setShowAddLinks}>
              <div className="linkform">
                <div className="row">
                  <fieldset>
                    <label htmlFor="linktext">Link Text</label>
                    <input ref={linkTextRef} name="linktext" />
                  </fieldset>
                </div>
                <div className="row">
                  <fieldset>
                    <label htmlFor="linkurl">Link URL</label>
                    <input ref={linkURLRef} name="linkurl" />
                  </fieldset>
                </div>
                <div className="row">
                  <Button onClick={handleAddLink}>Save Link</Button>
                </div>
              </div>
            </ShowHideSection>
            <BadgeField selected={selectedLinks} badgeText="linktext" direction="remove" onRemove={removeLinkById} />
          </main>
        </FormPageLayout>
      </div>
    </BasicPage>
  );
};

export default TreatmentForm;
