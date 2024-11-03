import React from "react";
import "./WeatherReportForm.css";

function WeatherReportForm({ type, closeReportForm }) {
  return (
    <div className="weather-report-form">
      <div className="form-overlay" onClick={closeReportForm}></div> {/* Background overlay to close on click */}
      <div className="form-content">
        <h2>{type}</h2>
        <form>
          <label>Location or coordinates</label>
          <input type="text" className="location" placeholder="Enter location" />
          <label>Description</label>
          <textarea placeholder="Describe the situation"></textarea>
          <label>
            <input type="file" />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={closeReportForm}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WeatherReportForm;
