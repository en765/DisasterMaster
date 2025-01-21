// App.jsx
import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
import EditorDashboard from "./components/EditorDashboard/EditorDashboard.jsx";
import "./App.css";

// Google OAuth Client ID
const clientId = "800763204372-6hekpah0bsrb62mhp0oi16522ihbpi0b.apps.googleusercontent.com";

// Hardcode backend URL
const BACKEND_URL = "https://server-dm.onrender.com";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addReportOpen, setAddReportOpen] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Praćenje stanja prijave
  const [userName, setUserName] = useState(""); // Ime korisnika nakon prijave

  const openReportForm = (type) => {
    setReportType(type);
    setAddReportOpen(false);
  };

  const closeReportForm = () => {
    setReportType(null);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true); // Otvaranje login overlay-a
  };

  const handleLoginSuccess = async () => {
    try {
      const response = await fetch(`https://server-dm.onrender.com/login-success`, {
        method: "GET",
        credentials: "include", // Slanje kolačića za sesiju
      });

      if (!response.ok) {
        throw new Error("Neuspjelo preuzimanje korisničkih podataka");
      }

      const userName = await response.text();
      setIsLoggedIn(true);
      setUserName(userName); // Postavi ime korisnika
      setIsLoginOpen(false); // Zatvori login overlay
    } catch (error) {
      console.error("Greška pri preuzimanju korisničkih podataka:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Odjava korisnika
    setUserName("");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Proveri da li je korisnik već prijavljen
    const checkLogin = async () => {
      try {
        const response = await fetch(`https://server-dm.onrender.com/login-success`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userName = await response.text();
          setIsLoggedIn(true);
          setUserName(userName);
        }
      } catch (error) {
        console.error("Greška pri proveri prijave:", error);
      }
    };

    checkLogin();
  }, []); // Izvršava se samo jednom nakon montaže komponente

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="app">
          <Header
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onLoginOpen={handleLoginOpen}
            isLoggedIn={isLoggedIn} // Proslijedi stanje prijave
            onLogout={handleLogout} // Proslijedi handler za odjavu
            userName={userName} // Proslijedi ime prijavljenog korisnika
          />
          {menuOpen && <Menu closeMenu={closeMenu} />}

          {isLoginOpen && (
            <div className="login-overlay">
              <LoginForm
                handleLoginClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
              />
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
                <SafetyMeasures menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              }
            />
            <Route
              path="/nearest-shelters"
              element={
                <NearestShelters menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              }
            />
            <Route
              path="/available-resources"
              element={
                <AvailableResources menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              }
            />
            {/* privremena ruta za testiranje */}
            <Route path="/editor-dashboard" element={<EditorDashboard />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
