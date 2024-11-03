import React from "react";
import mapImg from "../../pictures/MapaSvijeta.jpg";
import "./Map.css";

function Map() {
  return (
    <div className="map-container">
      <img
        src={mapImg}
        alt="World Map"
        className="world-map"
      />
      <input className="search-input" type="text" placeholder="Search" />
    </div>
  );
}

export default Map;
