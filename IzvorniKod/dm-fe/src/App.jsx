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
import "./App.css";

const clientId = "800763204372-6hekpah0bsrb62mhp0oi16522ihbpi0b.apps.googleusercontent.com";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addReportOpen, setAddReportOpen] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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

  const handleLoginSuccess = async () => {
    try {
      const response = await fetch("http://localhost:8080/login-success", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userName = await response.text();
      setIsLoggedIn(true);
      setUserName(userName);
      setIsLoginOpen(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
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
  }, []);

  return (
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <div className="app">
            <Header
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onLoginOpen={handleLoginOpen}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                userName={userName}
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
                      <BottomButtons
                          setAddReportOpen={setAddReportOpen}
                          isLoggedIn={isLoggedIn} // Pass login state
                      />
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
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
  );
}

export default App;