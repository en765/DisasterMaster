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

    // Initialize a single marker and keep it in state
    const initialMarker = L.marker([51.505, -0.09]).addTo(mapInstance);
    setMarker(initialMarker);

    mapInstance.on('click', async (e) => {
      // Move the existing marker to the new location
      initialMarker.setLatLng(e.latlng);

      // Fetch location name based on the clicked coordinates
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const report = { location, description };

    try {
      const response = await fetch("/api/weather-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      if (response.ok) {
        console.log("Weather report submitted successfully!");
        closeReportForm();
      } else {
        console.error("Failed to submit weather report.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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