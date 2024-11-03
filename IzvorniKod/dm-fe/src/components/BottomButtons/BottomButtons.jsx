import React from "react";
import "./BottomButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function BottomButtons({ setAddReportOpen }) {
  return (
    <div className="bottom-buttons">
      <div className="left-buttons">
        <button className="subscribe-button">
          <FontAwesomeIcon icon={faBell} style={{ marginRight: '8px' }} />
          Subscribe
        </button>
        <button className="emergency-call-button">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />
          Call an emergency line
        </button>
      </div>
      <button
        className="add-report-button"
        onClick={() => setAddReportOpen((prev) => !prev)}
      >
        + Add new weather reports
      </button>
    </div>
  );
}

export default BottomButtons;
