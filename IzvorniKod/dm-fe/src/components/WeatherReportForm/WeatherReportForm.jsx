import React, { useState, useEffect } from "react";
import L from "leaflet";
import "./WeatherReportForm.css";
import "leaflet/dist/leaflet.css";

function WeatherReportForm({ type, closeReportForm }) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    const mapInstance = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    const initialMarker = L.marker([51.505, -0.09]).addTo(mapInstance);
    setMarker(initialMarker);

    mapInstance.on("click", async (e) => {
      initialMarker.setLatLng(e.latlng);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      );
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`
        );
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

    // Validate location
    if (!location) {
      alert("Please select a location.");
      return;
    }
    const userId = 1; // Replace with actual user ID if dynamic
    // Prepare the request body
    const requestBody = {
      userId,
      disasterType: type.toUpperCase(), // Ensures it matches the enum on the backend
      location, // Already set by the map or search
      description, // User input from the form
      createdAt: new Date().toISOString(), // Converts to ISO string (valid for LocalDateTime)
      photo: "example-photo-string", // Replace with actual photo logic or leave placeholder
    };

    console.log("Request Body:", requestBody); // Debugging

    try {
      // Send the POST request to the backend
      const response = await fetch(`http://localhost:8080/reports/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const createdReport = await response.json();
        console.log("Report created:", createdReport);
        closeReportForm(); // Close the form after successful submission
      } else {
        const errorText = await response.text();
        console.error("Error creating report:", response.status, errorText);
        alert(`Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Error communicating with the server:", error.message);
      alert("An error occurred. Please try again.");
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
            style={{ fontSize: "15px", fontFamily: "Gill Sans" }}
            value={locationInput}
            onChange={handleLocationChange}
          />
          <button
            type="button"
            className="form-search"
            onClick={handleLocationSubmit}
          >
            Search
          </button>
          <div id="map" style={{ height: "270px", width: "100%" }}></div>
          <label>Description</label>
          <textarea
            placeholder="Describe the situation"
            style={{ fontSize: "15px", fontFamily: "Gill Sans" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>
            <input type="file" disabled />
          </label>
          <div className="form-buttons">
            <button
              type="button"
              className="button-form"
              onClick={closeReportForm}
            >
              Cancel
            </button>
            <button type="submit" className="button-form">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WeatherReportForm;
