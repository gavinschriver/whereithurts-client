import React from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import Button from "../ui/Button";
import "./Nav.css";

export const NavBar = () => {
  const history = useHistory()

  return (
    <nav className="nav">
      <Button>
        <NavLink to="/">Home</NavLink>
      </Button>
      <div className="nav__menu">
        <Button>
          <NavLink to="/healings">Healings</NavLink>
        </Button>
        <Button>
          <NavLink to="/treatments">Treatments</NavLink>
        </Button>
        <Button>
          <NavLink to="/hurts">Hurts</NavLink>
        </Button>
      </div>
      <Button onClick={() => {
        localStorage.removeItem("patient_id")
        localStorage.removeItem("patient_token")
        history.push("/login")
      }}>Logout</Button>
    </nav>
  );
};
