import React from "react";
import "./AddWeatherReports.css";

function AddWeatherReports({ openReportForm }) {
  return (
    <div className="add-weather-reports">
      <ul>
        <li onClick={() => openReportForm("Earthquake")}>🌍 Earthquake</li>
        <li onClick={() => openReportForm("Fire")}>🔥 Fire</li>
        <li onClick={() => openReportForm("Flood")}>🌊 Flood</li>
        <li onClick={() => openReportForm("Storm")}>🌩️ Storm</li>
      </ul>
    </div>
  );
}

export default AddWeatherReports;
