import React, { useEffect, useState } from "react";
import "./EditorDashboard.css";

const EditorDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy podaci
  const dummyReports = [
    { id: 1, type: "Flood", location: "Zagreb", description: "Severe flooding in the city center." },
    { id: 2, type: "Earthquake", location: "Split", description: "Minor earthquake reported near the coast." },
    { id: 3, type: "Fire", location: "Rijeka", description: "Wildfire spreading in the forest area." },
    { id: 4, type: "Storm", location: "Osijek", description: "Heavy storm with strong winds." },
    { id: 5, type: "Landslide", location: "Dubrovnik", description: "Landslide blocking main road." },
  ];

  // Postavi dummy podatke na početku
  useEffect(() => {
    setTimeout(() => {
      setReports(dummyReports);
      setLoading(false);
    }, 1000); // Simuliraj kašnjenje za učitavanje podataka
  }, []);

  // Funkcija za odobravanje prijave
  const handleApprove = (reportId) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
  };

  // Funkcija za odbijanje prijave
  const handleReject = (reportId) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div>
      <h1>Editor Dashboard</h1>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.type}</td>
                <td>{report.location}</td>
                <td>{report.description}</td>
                <td>
                  <button onClick={() => handleApprove(report.id)}>Approve</button>
                  <button onClick={() => handleReject(report.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditorDashboard;