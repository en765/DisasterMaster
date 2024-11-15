import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Map from "./components/Map/Map.jsx";
import BottomButtons from "./components/BottomButtons/BottomButtons.jsx";
import AddWeatherReports from "./components/AddWeatherReports/AddWeatherReports.jsx";
import WeatherReportForm from "./components/WeatherReportForm/WeatherReportForm.jsx";
import LoginForm from "./components/Login/Login.jsx";
import SafetyMeasures from "./components/SafetyMeasures/SafetyMeasures.jsx";
import NearestShelters from "./components/NearestShelters/NearestShelters.jsx";
import AvailableResources from "./components/AvailableResources/AvailableResources.jsx";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // Upravljanje stanjem menija
  const [addReportOpen, setAddReportOpen] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openReportForm = (type) => {
    setReportType(type);
    setAddReportOpen(false);
  };

  const closeReportForm = () => {
    setReportType(null);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <Router>
      <div className={`app ${isLoginOpen ? "blurred" : ""}`}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLoginOpen={handleLoginOpen}/>
        {menuOpen && <Menu closeMenu={closeMenu} />}
        {isLoginOpen && (
          <div className="login-overlay">
            <LoginForm handleLoginClose={handleLoginClose} />
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <Map />
                {addReportOpen && (
                  <AddWeatherReports openReportForm={openReportForm} />
                )}
                {reportType && (
                  <WeatherReportForm
                    type={reportType}
                    closeReportForm={closeReportForm}
                  />
                )}
                <BottomButtons setAddReportOpen={setAddReportOpen} />
              </div>
            }
          />
          <Route
            path="/safety-measures"
            element={
              <SafetyMeasures
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            }
          />
          <Route
            path="/nearest-shelters"
            element={
              <NearestShelters
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            }
          />
          <Route
            path="/available-resources"
            element={
              <AvailableResources
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
