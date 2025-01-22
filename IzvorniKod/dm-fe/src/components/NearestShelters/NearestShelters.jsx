import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NearestShelters.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function NearestShelters() {
  const [location, setLocation] = useState("");
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location!");
      return;
    }

    try {
      // Prvo dohvatimo koordinate za uneseni grad
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": "DisasterMasterApp",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("No results found for the given location.");
        return;
      }

      const coordinates = data[0];
      const lat = coordinates.lat;
      const lon = coordinates.lon;

      // Dohvati skloništa u radijusu 5 km od unesene lokacije
      const overpassQuery = `
        [out:json];
        node["amenity"="shelter"](around:5000, ${lat}, ${lon});
        out body;
      `;
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        overpassQuery
      )}`;

      const sheltersResponse = await fetch(overpassUrl);
      const sheltersData = await sheltersResponse.json();

      if (sheltersData.elements.length === 0) {
        alert("No shelters found nearby.");
        setShelters([]);
        return;
      }

      // Filtriraj samo skloništa koja imaju ime (nije unnamed) i adresu
      const shelterList = sheltersData.elements
        .filter((shelter) => shelter.tags.name) // Filtriraj samo skloništa s imenom i adresom
        .map((shelter) => ({
          name: shelter.tags.name,
          latitude: shelter.lat,
          longitude: shelter.lon,
          address: shelter.tags["addr:full"],
        }))
        .slice(0, 3);

      setShelters(shelterList);
    } catch (error) {
      console.error("Error fetching shelters:", error);
      alert("An error occurred while searching for shelters.");
    }
  };

  return (
    <div id="nearest-shelters">
      <h1>Nearest Shelters</h1>
      <p>Enter your location to find nearby shelters:</p>
      <input
        type="text"
        placeholder="City, Country"
        value={location}
        onChange={handleInputChange}
      />
      <button className="search" onClick={handleSearch}>
        Search
      </button>

      <div className="shelter-results">
        {loading ? (
          <p>Searching for shelters...</p>
        ) : shelters.length > 0 ? (
          <div id="results">
            {shelters.map((shelter, index) => (
              <div key={index} className="shelter-card">
                <h3>{shelter.name}</h3>
                <p>
                  <strong>Coordinates:</strong> {shelter.latitude},{" "}
                  {shelter.longitude}
                </p>
              </div>
            ))}

            {/* Display map */}
            <div style={{ height: "250px", width: "100%", marginTop: "20px" }}>
              <MapContainer
                center={[
                  shelters[0].latitude || 45.815,
                  shelters[0].longitude || 15.981,
                ]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {shelters.map((shelter, index) => (
                  <Marker
                    key={index}
                    position={[shelter.latitude, shelter.longitude]}
                  >
                    <Popup>
                      <strong>{shelter.name}</strong>
                      <br />
                      {shelter.address}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: "20px"}}>
            No shelters found. Enter a location to search.
          </p>
        )}
      </div>

      <div id="container">
        <button className="container" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NearestShelters;
