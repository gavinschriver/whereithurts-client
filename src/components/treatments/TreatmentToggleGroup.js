import React, {useContext, useEffect} from "react";
import BadgeToggleGroup from "../ui/BadgeToggleGroup";
import { TreatmentContext } from "./TreatmentProvider";

const TreatmentToggleGroup = (props) => {
 const { treatments, getTreatmentsByPatientId} = useContext(TreatmentContext)

  useEffect(async () => {
    await getTreatmentsByPatientId(localStorage.getItem("patient_id"))
  },[])


  return (
    <div className="treatment_toggle_group">
      <BadgeToggleGroup
        collection={[]}
        resource="Treatments"
        badgeText="label"
        detailconfig={[]}
        {...props}
      />
    </div>
  );
};

export default TreatmentToggleGroup;
