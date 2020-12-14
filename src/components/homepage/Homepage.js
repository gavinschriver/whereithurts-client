import React, { useContext, useEffect } from "react";
import BasicPage from "../layouts/BasicPage";
import { PatientContext } from "../patients/PatientProvider";
import Button from "../ui/Button";
import "./Homepage.css";

const HomePage = () => {
  const { patient, getPatientById } = useContext(PatientContext);


  useEffect(async () => {
    await getPatientById(parseInt(localStorage.getItem("patient_id")));
  }, []);

  return (
    <main className="homepage">
      <BasicPage>
        <div className="basicwrapper">
          <h1>Welcome, {patient.first_name}</h1>
          <section className="homepage__buttons">
            <Button>
              <h2>Add a Hurt</h2>
            </Button>
            <Button>
              <h2>Add a Treatment</h2>
            </Button>
            <Button>
              <h2>Add a Healing</h2>
            </Button>
            <Button>
              <h2>Add an Update</h2>
            </Button>
          </section>
        </div>
      </BasicPage>
    </main>
  );
};

export default HomePage;
