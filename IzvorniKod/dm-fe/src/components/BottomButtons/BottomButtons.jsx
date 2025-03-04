import React from "react";
import "./BottomButtons.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function BottomButtons({ setAddReportOpen, openSubscribeModal }) { // Dodali smo openSubscribeModal kao prop
  const appVersion = "1.0.0";

  const openTermsOfUse = () => {
    window.open("/terms-of-use.pdf", "_blank");
  };

  const openUserGuide = () => {
    window.open("/user-guide.pdf", "_blank");
  };

  const navigate = useNavigate();

  return (
    <div className="bottom-buttons">
      <div className="left-buttons">
        <button 
          className="subscribe-button" 
          onClick={openSubscribeModal} 
        >
          <FontAwesomeIcon icon={faBell} style={{ marginRight: '8px' }} />
          Subscribe
        </button>
        <button onClick={() => navigate('/available-resources')} className="emergency-call-button">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />
          Call an emergency line
        </button>
      </div>

      <div className="bottom-info">
        <p> Version: {appVersion}</p>
        <button className="terms-button" onClick={openTermsOfUse}>
          Terms of Use
        </button>
        <button className="terms-button" onClick={openUserGuide}>
          User Guide
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
