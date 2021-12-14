import React from "react";
import { Link } from "react-router-dom";

function Naavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home">
          <p className="navbar-brand">CarPOOLING</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ml-3">
              <Link to="/home">
                <p>Home</p>
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link to="/schedule">
                <p>Schedule</p>
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link to="/MyTrips">
                <p>MyTrips</p>
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link to="/login" className="text-danger">
                <p>logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Naavbar;
