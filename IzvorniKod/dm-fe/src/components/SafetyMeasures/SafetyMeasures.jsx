import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SafetyMeasures.css";
import icon1 from "../../pictures/icon1.png";
import icon2 from "../../pictures/icon2.png";
import icon3 from "../../pictures/icon3.png";
import icon4 from "../../pictures/icon4.png";
import Header from "../Header/Header.jsx"; 
import Menu from "../Menu/Menu.jsx";

function Safety({ image, title, description }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

function SafetyMeasures({ onClose, menuOpen, setMenuOpen}) {
  const navigate = useNavigate();
  
  return (
    <div id="safety-measures-page">
      {/* {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />} */}
      <h2>Safety Measures</h2>
      <ul class="centered-list">
        <li>stay informed with reliable emergency updates</li>
        <li>prepare an emergency kit with essentials</li>
        <li>have a family communication and evacuation plan</li>
        <li>know where to take shelter in case of different emergencies</li>
      </ul>

      <section id="safety">
        <ul>
          <Safety
            title="Earthquake Safety"
            description="Cover your head with hands and hold on to something sturdy. Identify safe spots in each room. Stay away from windows and heavy objects. Avoid using elevators."
            image={icon1}
          ></Safety>
          <Safety
            title="Fire Safety"
            description="Clear flammable materials around your home, wear protective clothing and prepare multiple exit routes in case one is blocked by the fire. Stay low to the ground to avoid smoke."
            image={icon2}
          ></Safety>
          <Safety
            title="Flood Safety"
            description="Move to higher ground, turn off utilities and avoid walking or driving through floodwaters. Prepare an emergency kit and keep important documents safe."
            image={icon3}
          ></Safety>
          <Safety
            title="Storm Safety"
            description="Stay indoors, avoid travelling and prepare for power outrages. Prepare emergency supplies like water, food, flashlight and first aid kit. Listen to weather updates."
            image={icon4}
          ></Safety>
        </ul>
      </section>

      <div id="container" >
        <button className="container" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

export default SafetyMeasures;