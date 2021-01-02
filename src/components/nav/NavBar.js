import React, { useState } from "react";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Button from "../ui/Button";
import "./Nav.css";

export const NavBar = () => {
  const history = useHistory();

  const [showing, setShowing] = useState(false);
  const toggleMenu = () => setShowing(!showing);
  const closeMobileMenu = () => setShowing(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          WhereItHurts
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={showing ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={showing ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/hurts' className='nav-links' onClick={closeMobileMenu}>
              Hurts
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/healings' className='nav-links' onClick={closeMobileMenu}>
              Healings
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/treatments' className='nav-links' onClick={closeMobileMenu}>
              Treatments
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/updates' className='nav-links' onClick={closeMobileMenu}>
              Updates
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/snapshot' className='nav-links' onClick={closeMobileMenu}>
              Snapshot
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

{
  /* <nav className="nav">
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
  <Button>
    <NavLink to="/updates">Updates</NavLink>
  </Button>
  <Button>
    <NavLink to="/snapshot">Snapshot</NavLink>
  </Button>
</div>
<Button onClick={() => {
  localStorage.removeItem("patient_id")
  localStorage.removeItem("patient_token")
  history.push("/login")
}}>Logout</Button>
</nav> */
}
