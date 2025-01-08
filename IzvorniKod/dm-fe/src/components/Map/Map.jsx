import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReportModal from "./ReportModal";  // Import the new modal component
import "./Map.css";

function Map() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedReport, setSelectedReport] = useState(null); // State to manage selected report

  useEffect(() => {
    const mapInstance = L.map("homepage-map").setView([51.505, -0.09], 3);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const loadMarkers = () => {
    if (!map) return;

    const storedReports = JSON.parse(localStorage.getItem("weatherReports")) || [];
    const newMarkers = [];

    // Remove existing markers from the map
    markers.forEach((marker) => map.removeLayer(marker));
    setMarkers([]);

    // Add new markers for stored reports
    storedReports.forEach((report) => {
      const [lat, lon] = (report.location || "").split(", ").map(Number);
      if (!isNaN(lat) && !isNaN(lon)) {
        const marker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<b>Location:</b> ${report.location}<br/><b>Description:</b> ${report.description}`)
            .on("click", () => handleMarkerClick(report)); // Add click handler
        newMarkers.push(marker);
      }
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    loadMarkers();
    const interval = setInterval(loadMarkers, 5000);

    return () => clearInterval(interval);
  }, [map]);

  const handleSearch = async () => {
    if (searchInput) {
      try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (map) {
            map.setView([lat, lon], 13);
            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<b>Searched Location:</b> ${searchInput}`)
                .openPopup();
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

  const handleMarkerClick = (report) => {
    setSelectedReport(report); // Set the selected report to display in the modal
  };

  const closeModal = () => {
    setSelectedReport(null); // Close the modal by clearing the selected report
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
        {selectedReport && <ReportModal report={selectedReport} onClose={closeModal} />}  {/* Render the modal if a report is selected */}
      </div>
  );
}

export default Map;
