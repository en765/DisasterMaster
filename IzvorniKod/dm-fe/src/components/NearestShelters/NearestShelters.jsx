import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NearestShelters.css";

function NearestShelters() {
  const [location, setLocation] = useState("");
  const [shelters, setShelters] = useState([]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location!");
      return;
    }
    const mockShelters = [
      {
        name: "Central City Shelter",
        address: "123 Main St, Central City",
        capacity: "200 people",
        distance: "1.5 km",
      },
      {
        name: "Eastside Shelter",
        address: "456 East St, Central City",
        capacity: "100 people",
        distance: "3 km",
      },
    ];
    setShelters(mockShelters);
  };
  return (
    <div className="nearest-shelters">
      <h1>Nearest Shelters</h1>
      <p>Enter your location to find nearby shelters:</p>
      <input
        type="text"
        placeholder="City, Country"
        value={location}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="shelter-results">
        {shelters.length > 0 ? (
          shelters.map((shelter, index) => (
            <div key={index} className="shelter-card">
              <h3>{shelter.name}</h3>
              <p><strong>Address:</strong> {shelter.address}</p>
              <p><strong>Capacity:</strong> {shelter.capacity}</p>
              <p><strong>Distance:</strong> {shelter.distance}</p>
            </div>
          ))
        ) : (
          <p>No shelters found. Enter a location to search.</p>
        )}
      </div>
    </div>
  );
}

export default NearestShelters;
