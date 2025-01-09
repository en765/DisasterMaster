import React, { useState, useEffect } from "react";
import L from "leaflet";
import "./WeatherReportForm.css";
import 'leaflet/dist/leaflet.css';

function WeatherReportForm({ type, closeReportForm }) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    const mapInstance = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance);

    const initialMarker = L.marker([51.505, -0.09]).addTo(mapInstance);
    setMarker(initialMarker);

    mapInstance.on('click', async (e) => {
      initialMarker.setLatLng(e.latlng);

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
      const data = await response.json();
      const displayName = data.display_name || `${e.latlng.lat}, ${e.latlng.lng}`;
      setLocationInput(displayName);
      setLocation(`${e.latlng.lat}, ${e.latlng.lng}`);
    });

    setMap(mapInstance);
    return () => {
      mapInstance.off();
      mapInstance.remove();
    };
  }, []);

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (locationInput) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (map && marker) {
            map.setView([lat, lon], 13);
            marker.setLatLng([lat, lon]);
            setLocation(`${lat}, ${lon}`);
          }
        } else {
          alert("Location not found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location. Please try again.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const report = { 
      type,
      location,
      description,
      time: new Date().toLocaleString(),
      image: document.querySelector("input[type=file]").files[0]
      ? URL.createObjectURL(document.querySelector("input[type=file]").files[0])
      : null,
    };

    // Fetch existing reports from localStorage
    const storedReports = JSON.parse(localStorage.getItem("weatherReports")) || [];

    // Add the new report to the list
    const updatedReports = [...storedReports, report];

    // Store updated reports back into localStorage
    localStorage.setItem("weatherReports", JSON.stringify(updatedReports));

    console.log("Weather report saved to localStorage:", report);
    closeReportForm();
  };

  return (
      <div className="weather-report-form">
        <div className="form-overlay" onClick={closeReportForm}></div>
        <div className="form-content">
          <h2>{type}</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: "20px" }}>Location or coordinates</label>
            <input
                type="text"
                placeholder="Enter location"
                style={{ fontSize: "15px" , fontFamily: "Gill Sans"}}
                value={locationInput}
                onChange={handleLocationChange}
            />
            <button type="button" onClick={handleLocationSubmit}>Search</button>
            <div id="map" style={{ height: "350px", width: "100%" }}></div>
            <label>Description</label>
            <textarea
                placeholder="Describe the situation"
                style={{ fontSize: "15px" , fontFamily: "Gill Sans"}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
