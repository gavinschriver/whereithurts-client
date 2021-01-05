import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import { PatientContext } from "../patients/PatientProvider";
import Button from "../ui/Button";
import "./Homepage.css";
import RecentActivity from "./RecentActivity";

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
          <div className="welcome">
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
        </div>
        <div className="basicwrapper">
          <RecentActivity activities={patient.recent_activity} />
        </div>
      </main>
    </BasicPage>
  );
};

export default HomePage;
