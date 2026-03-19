import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Graywater System</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-item">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/monitoring" className="nav-item">
            Water Monitoring
          </NavLink>
        </li>

        <li>
          <NavLink to="/tank" className="nav-item">
            Tank Status
          </NavLink>
        </li>

        <li>
          <NavLink to="/analytics" className="nav-item">
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink to="/simulation" className="nav-item">
            Simulation
          </NavLink>
        </li>

       </ul>
    </nav>
  );
}

export default Navbar;