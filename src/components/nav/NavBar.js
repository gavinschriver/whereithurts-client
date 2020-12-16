import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import "./Nav.css";

export const NavBar = () => {
  return (
    <nav className="nav">
      <Button>
        <NavLink to="/">Home</NavLink>
      </Button>
      <div className="nav__menu">
        <Button>
          <NavLink to="/healings">Healings</NavLink>
        </Button>
      </div>
      <Button>Logout</Button>
    </nav>
  );
};
