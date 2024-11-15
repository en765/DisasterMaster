import React, { useState } from "react";
import "./AvailableResources.css";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu.jsx";

function AvailableResources({ onClose, menuOpen, setMenuOpen }) {
  return (
    <div>
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      <div className="available-resources-title">
        <h2>Emergency Contacts</h2>
      </div>
      <div className="emergency-contacts-container">
        {/* Left Column */}
        <div className="emergency-contacts left-column">
          <h3>General Emergency Numbers</h3>
          <ul>
            <li>
              <strong>Universal Emergency Number (Europe):</strong> 112
            </li>
            <li>
              <strong>USA Emergency Number:</strong> 911
            </li>
            <li>
              <strong>Canada Emergency Number:</strong> 911
            </li>
            <li>
              <strong>Australia Emergency Number:</strong> 000
            </li>
          </ul>

          <h3>Weather and Disaster Hotlines</h3>
          <ul>
            <li>
              <strong>National Hurricane Center (USA):</strong>
              <a
                href="https://www.nhc.noaa.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.nhc.noaa.gov
              </a>{" "}
              - 1-800-240-6522
            </li>
            <li>
              <strong>FEMA Disaster Assistance (USA):</strong>
              <a
                href="https://www.disasterassistance.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.disasterassistance.gov
              </a>{" "}
              - 1-800-621-FEMA (3362)
            </li>
            <li>
              <strong>Red Cross Emergency Hotline (USA):</strong> 1-800-733-2767
            </li>
            <li>
              <strong>Red Cross International:</strong>
              <a
                href="https://www.redcross.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                 Check local branch
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="emergency-contacts right-column">
          <h3>Flood and Storm Hotlines</h3>
          <ul>
            <li>
              <strong>Flood Warning Information Service (UK):</strong>
              <a
                href="https://www.gov.uk/flood"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.gov.uk/flood
              </a>{" "}
              - 0345 988 1188
            </li>
            <li>
              <strong>Australian Bureau of Meteorology:</strong>
              <a
                href="https://www.bom.gov.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.bom.gov.au
              </a>{" "}
              - 1300 659 210
            </li>
          </ul>

          <h3>Medical Emergency Numbers</h3>
          <ul>
            <li>
              <strong>Poison Control (USA):</strong> 1-800-222-1222
            </li>
            <li>
              <strong>COVID-19 Helpline (WHO):</strong>
              <a
                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                target="_blank"
                rel="noopener noreferrer"
              >
                 WHO COVID-19 Info
              </a>
            </li>
          </ul>

          <h3>Mental Health Hotlines</h3>
          <ul>
            <li>
              <strong>National Suicide Prevention Lifeline (USA):</strong>
              <a
                href="https://suicidepreventionlifeline.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                 suicidepreventionlifeline.org
              </a>{" "}
              - 988 or 1-800-273-TALK (8255)
            </li>
            <li>
              <strong>Samaritans (UK):</strong>
              <a
                href="https://www.samaritans.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.samaritans.org
              </a>{" "}
              - 116 123
            </li>
            <li>
              <strong>Lifeline Australia:</strong>
              <a
                href="https://www.lifeline.org.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.lifeline.org.au
              </a>{" "}
              - 13 11 14
            </li>
          </ul>

          <h3>Local Government and Relief Agencies</h3>
          <ul>
            <li>
              <strong>UNICEF Emergency Services:</strong>
              <a
                href="https://www.unicef.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.unicef.org
              </a>
            </li>
            <li>
              <strong>World Health Organization (WHO):</strong>
              <a
                href="https://www.who.int"
                target="_blank"
                rel="noopener noreferrer"
              >
                 www.who.int
              </a>
            </li>
            <li>
              <strong>Civil Protection (EU):</strong>
              <a
                href="https://ec.europa.eu/echo"
                target="_blank"
                rel="noopener noreferrer"
              >
                 ec.europa.eu/echo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AvailableResources;
