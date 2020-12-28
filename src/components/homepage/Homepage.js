import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import { PatientContext } from "../patients/PatientProvider";
import Button from "../ui/Button";
import "./Homepage.css";

const HomePage = () => {
  const { patient, getPatientById } = useContext(PatientContext);

  useEffect(() => {
    _getPatientById();
  }, []);

  const _getPatientById = async () => {
    await getPatientById(parseInt(localStorage.getItem("patient_id")));
  };

  return (
    <BasicPage>
      <main className="homepage">
        <div className="basicwrapper">
          <h1>Welcome, {patient.first_name}</h1>
          <section className="homepage__buttons">
            <Button>
              <Link to="/hurts/new">
                <h2>Add a Hurt</h2>
              </Link>
            </Button>
            <Button>
              <Link to="/treatments/new">
                <h2>Add a Treatment</h2>
              </Link>
            </Button>
            <Button>
              <Link to="/healings/new">
                <h2>Add a Healing</h2>
              </Link>
            </Button>
            <Button>
              <Link to="updates/new">
                <h2>Add an Update</h2>
              </Link>
            </Button>
          </section>
        </div>
      </main>
    </BasicPage>
  );
};

export default HomePage;
