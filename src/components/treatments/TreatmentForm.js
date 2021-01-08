import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { deselectItemById } from "../../utils/helpers";
import FourOhFourPage from "../auth/404Page";
import UnauthorizedPage from "../auth/UnauthorizedPage";
import BodypartSelectBar from "../bodypart/BodypartSelectBar";
import { HurtContext } from "../hurts/HurtProvider";
import HurtToggleGroup from "../hurts/HurtToggleGroup";
import BasicPage from "../layouts/BasicPage";
import FormPageLayout from "../layouts/FormPageLayout";
import TreatmentTypeSelectBar from "../treatmenttypes/TreatmentTypeSelectBar";
import Alert from "../ui/Alert";
import BadgeField from "../ui/BadgeField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import LoadingWrapper from "../ui/LoadingWrapper";
import ShowHideSection from "../ui/ShowHideSection";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { TreatmentContext } from "./TreatmentProvider";

const TreatmentForm = () => {
  //access History, Location and Param objects; establish if we're in editMode or not

  //if we're in edit mode, we'll be accessing the values from the treatmentToUpdate, which is loaded into state from the response body,
  // and setting them to the corresponding state variable values (basicFormValues, selectedHurts and selectedLinks)

  const history = useHistory();
  const location = useLocation();
  const { treatmentId } = useParams();

  const editMode = location.pathname.includes("edit");

  //treatment
  const { createTreatment, getTreatmentById, updateTreatment } = useContext(
    TreatmentContext
  );

  const [basicFormValues, setBasicFormValues] = useState({
    bodypart_id: "",
    treatmenttype_id: "",
    name: "",
    notes: "",
    owner: true,
  });

  const handleBasicFormValueInputChange = (e) => {
    const { name, value } = e.target;
    setBasicFormValues({ ...basicFormValues, [name]: value });
  };

  //handle treatment add or update

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    if (validate()) {
      const newTreatment = {
        name: basicFormValues.name,
        notes: basicFormValues.notes,
        treatmenttype_id: parseInt(basicFormValues.treatmenttype_id),
        bodypart_id: parseInt(basicFormValues.bodypart_id),
        hurt_ids: selectedHurts.map((h) => h.id),
        treatment_links: selectedLinks,
        public: isPublic,
      };
      if (editMode) {
        await updateTreatment(treatmentId, newTreatment);
        history.push("/treatments");
      } else {
        const createdTreatment = await createTreatment(newTreatment);
        history.push(`/treatments/${createdTreatment.id}`);
      }
    } else setShowAlert(true);
  };

  // validation
  const [showAlert, setShowAlert] = useState(false);

  const validate = () => {
    const treatmentName = basicFormValues.name.trim();
    const bodypartId = parseInt(basicFormValues.bodypart_id);
    const treatmenttypeId = parseInt(basicFormValues.treatmenttype_id);
    if (bodypartId >= 1 && treatmenttypeId >= 1 && treatmentName != "") {
      return true;
    }
    return false;
  };

  const alert = <Alert onClose={() => setShowAlert(false)} />;

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

  const handleAddLink = (e) => {
    const newLink = {
      id: linkIDcount + 1,
      linktext: linkTextRef.current.value,
      linkurl: linkURLRef.current.value,
    };
    setSelectedLinks([...selectedLinks, newLink]);
  };

  useEffect(() => {
    setLinkIdCount((linkIDcount) => linkIDcount + 1);
  }, [selectedLinks]);

  const removeLinkById = deselectItemById(selectedLinks, setSelectedLinks);

  // public or private
  const [isPublic, setIsPublic] = useState(false);
  const handlePublicPrivateToggle = (e) => {
    setIsPublic((isPublic) => !isPublic);
  };

  // initial hooks; filter the tagged hurts for only this user
  const _getInitialValues = async () => {
    const treatment = await getTreatmentById(treatmentId);
    if ("id" in treatment) {
      setSelectedHurts(
        treatment.hurts.filter(
          (h) => h.patient.id === parseInt(localStorage.getItem("patient_id"))
        )
      );
      setSelectedLinks(treatment.links);
      setIsPublic(treatment.public);
      setBasicFormValues({
        owner: treatment.owner,
        name: treatment.name,
        notes: treatment.notes,
        treatmenttype_id: treatment.treatmenttype.id,
        bodypart_id: treatment.bodypart.id,
      });
      if (treatment.links.length)
        setLinkIdCount(
          treatment.links
            .map((tl) => tl.id)
            .sort()
            .reverse()[0]
        );
    } else setIdExists(false);
  };

  useEffect(() => {
    getHurtsByPatientId(localStorage.getItem("patient_id")).then(() => {
      if (editMode && treatmentId) {
        _getInitialValues();
      }
      setIsLoaded(true);
    });
  }, []);

  //loading state
  const [isLoaded, setIsLoaded] = useState(false);
  const [idExists, setIdExists] = useState(true);

  const renderForm = () => {
    return (
      <div className="basicwrapper">
        <FormPageLayout
          resource="Treatment"
          isEditMode={editMode}
          onClick={handleSubmitNew}
          alert={alert}
          showAlert={showAlert}
        >
          <main className="treatmentform">
            <TextInput
              name="name"
              label="Name"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.name}
              isrequired={
                showAlert && basicFormValues.name.trim() === ""
                  ? "true"
                  : "false"
              }
            />
            <TreatmentTypeSelectBar
              name="treatmenttype_id"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.treatmenttype_id}
              isrequired={
                showAlert && !(basicFormValues.treatmenttype_id >= 1)
                  ? "true"
                  : "false"
              }
            />
            <BodypartSelectBar
              name="bodypart_id"
              onChange={handleBasicFormValueInputChange}
              value={basicFormValues.bodypart_id}
              isrequired={
                showAlert && !(basicFormValues.bodypart_id >= 1)
                  ? "true"
                  : "false"
              }
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
              detailconfig={{ configkeys: ["name", "bodypart", "notes"] }}
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
              detailconfig={{ configkeys: ["linktext"] }}
            />
            <div className="public_private_select">
              <label htmlFor="is_private">Private</label>
              <input
                name="public_private"
                id="is_private"
                value={false}
                checked={!isPublic}
                type="radio"
                onChange={handlePublicPrivateToggle}
              />
              <label htmlFor="is_public">Public</label>
              <input
                name="public_private"
                id="is_public"
                value={true}
                checked={isPublic}
                type="radio"
                onChange={handlePublicPrivateToggle}
              />
            </div>
          </main>
          <div className="row align-right"></div>
        </FormPageLayout>
      </div>
    );
  };

  if (isLoaded) {
    if (!editMode || idExists) {
      if (!editMode || basicFormValues.owner === true)
        return <BasicPage>{renderForm()}</BasicPage>;
      else return <UnauthorizedPage />;
    } else return <FourOhFourPage />;
  }

  return (
    <LoadingWrapper>
      <Loader />
    </LoadingWrapper>
  );
};

export default TreatmentForm;

// {isLoaded ? (
//   <div className="basicwrapper">
//     <FormPageLayout
//       resource="Treatment"
//       isEditMode={editMode}
//       onClick={handleSubmitNew}
//       alert={alert}
//       showAlert={showAlert}
//     >
//       <main className="treatmentform">
//         <TextInput
//           name="name"
//           label="Name"
//           onChange={handleBasicFormValueInputChange}
//           value={basicFormValues.name}
//           isrequired={
//             showAlert && basicFormValues.name.trim() === ""
//               ? "true"
//               : "false"
//           }
//         />
//         <TreatmentTypeSelectBar
//           name="treatmenttype_id"
//           onChange={handleBasicFormValueInputChange}
//           value={basicFormValues.treatmenttype_id}
//           isrequired={
//             showAlert && !(basicFormValues.treatmenttype_id >= 1)
//               ? "true"
//               : "false"
//           }
//         />
//         <BodypartSelectBar
//           name="bodypart_id"
//           onChange={handleBasicFormValueInputChange}
//           value={basicFormValues.bodypart_id}
//           isrequired={
//             showAlert && !(basicFormValues.bodypart_id >= 1)
//               ? "true"
//               : "false"
//           }
//         />
//         <TextArea
//           name="notes"
//           label="Notes"
//           value={basicFormValues.notes}
//           onChange={handleBasicFormValueInputChange}
//         />
//         <HurtToggleGroup
//           collection={hurts}
//           showing={showAddHurts}
//           selected={selectedHurts}
//           setShowing={setShowAddHurts}
//           onAdd={handleSelectHurt}
//           onRemove={deselectHurtById}
//           detailconfig={{ configkeys: ["name", "bodypart", "notes"] }}
//         />
//         <ShowHideSection
//           showhidetext="Links"
//           showing={showAddLinks}
//           setShowing={setShowAddLinks}
//         >
//           <div className="linkform">
//             <div className="row linkform--row">
//               <fieldset className="linkform__field">
//                 <label htmlFor="linktext">Link Text</label>
//                 <input ref={linkTextRef} name="linktext" />
//               </fieldset>
//             </div>
//             <div className="row">
//               <fieldset className="linkform__field">
//                 <label htmlFor="linkurl">Link URL</label>
//                 <input ref={linkURLRef} name="linkurl" />
//               </fieldset>
//             </div>
//             <div className="row">
//               <Button onClick={handleAddLink}>Save Link</Button>
//             </div>
//           </div>
//         </ShowHideSection>
//         <BadgeField
//           selected={selectedLinks}
//           badgeText="linktext"
//           direction="remove"
//           onRemove={removeLinkById}
//           detailconfig={{ configkeys: ["linktext"] }}
//         />
//         <div className="public_private_select">
//           <label htmlFor="is_private">Private</label>
//           <input
//             name="public_private"
//             id="is_private"
//             value={false}
//             checked={!isPublic}
//             type="radio"
//             onChange={handlePublicPrivateToggle}
//           />
//           <label htmlFor="is_public">Public</label>
//           <input
//             name="public_private"
//             id="is_public"
//             value={true}
//             checked={isPublic}
//             type="radio"
//             onChange={handlePublicPrivateToggle}
//           />
//         </div>
//       </main>
//       <div className="row align-right"></div>
//     </FormPageLayout>
//   </div>
// ) : (
//   <div>Still loading...</div>
// )}
