import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

function Map() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Initialize the map once when the component mounts
    const mapInstance = L.map("homepage-map").setView([51.505, -0.09], 3);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    // Initialize a marker and set it to the initial coordinates
    const initialMarker = L.marker([51.505, -0.09]).addTo(mapInstance);
    setMarker(initialMarker);

    // Event listener to move the marker on map click
    const onMapClick = async (e) => {
      initialMarker.setLatLng(e.latlng);

      try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );
        const data = await response.json();
        const displayName = data.display_name || `${e.latlng.lat}, ${e.latlng.lng}`;
        setSearchInput(displayName);
      } catch (error) {
        console.error("Error fetching reverse geolocation:", error);
        alert("Error fetching location. Please try again.");
      }
    };

    mapInstance.on("click", onMapClick);

    // Save the map instance to state
    setMap(mapInstance);

    // Cleanup function to remove the map instance and event listeners
    return () => {
      mapInstance.off("click", onMapClick);
      mapInstance.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (searchInput) {
      try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                searchInput
            )}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (map && marker) {
            map.setView([lat, lon], 13);
            marker.setLatLng([lat, lon]);
          }
        } else {
          alert("Location not found!");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Error fetching location. Please try again.");
      }
    }
  };

  return (
      <div className="parent-container">
        <div className="map-container">
          <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div id="homepage-map" style={{ height: "500px", width: "100%" }}></div>
        </div>
      </div>
  );
}

export default Map;
