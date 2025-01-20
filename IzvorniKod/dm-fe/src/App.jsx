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

const clientId = "800763204372-6hekpah0bsrb62mhp0oi16522ihbpi0b.apps.googleusercontent.com";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addReportOpen, setAddReportOpen] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userName, setUserName] = useState(""); // Store user name

  const openReportForm = (type) => {
    setReportType(type);
    setAddReportOpen(false);
  };

  const closeReportForm = () => {
    setReportType(null);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true); // Open the login overlay
  };

  const handleLoginSuccess = async () => {
    try {
      const response = await fetch("http://localhost:8080/login-success", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userName = await response.text();
      setIsLoggedIn(true);
      setUserName(userName); // Set user name after login
      setIsLoginOpen(false); // Close login overlay
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login state to false
    setUserName("");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Check if the user is already logged in
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/login-success", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userName = await response.text();
          setIsLoggedIn(true);
          setUserName(userName);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLogin();
  }, []); // Runs only once when the component mounts

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="app">
          <Header
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onLoginOpen={handleLoginOpen}
            isLoggedIn={isLoggedIn} // Pass down login state
            onLogout={handleLogout} // Pass down logout handler
            userName={userName} // Pass down logged-in user's name
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