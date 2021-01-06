import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicPage from "../layouts/BasicPage";
import { PatientContext } from "../patients/PatientProvider";
import Button from "../ui/Button";
import "./Homepage.css";
import RecentActivity from "./RecentActivity";
import HomepageButton from "./HomepageButton";

const ADDBUTTON_DATA = [
  { text: "Add a Healing", path: "/healings/new" },
  { text: "Add a Hurt", path: "/hurts/new" },
  { text: "Add a Treatment", path: "/treatments/new" },
  { text: "Add an Update", path: "/updates/new" },
];

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
          <div className="row">
            <div className="col">
              <div className="welcome__wrapper">
                  <h1>Welcome, {patient.first_name}</h1>
                  <section className="homepage__buttons">
                    {ADDBUTTON_DATA.map((item, index) => {
                      return (
                        <HomepageButton
                          text={item.text}
                          key={index}
                          path={item.path}
                        />
                      );
                    })}
                  </section>
              </div>
            </div>
            <div className="col">
              <RecentActivity activities={patient.recent_activity} />
            </div>
          </div>
        </div>
      </main>
    </BasicPage>
  );
};

export default HomePage;
