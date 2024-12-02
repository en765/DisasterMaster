// App.jsx
//import pkg from 'pg';
import React, { useState } from "react";
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
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    //const { Pool } = pkg;
    //const pool = new Pool({ connectionString: ProcessingInstruction.env.DATABSE_URL });

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

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Set login state to true on successful login
        setIsLoginOpen(false); // Close the login overlay
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Set login state to false
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

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
                        <Route path="/safety-measures" element={<SafetyMeasures menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                        <Route path="/nearest-shelters" element={<NearestShelters menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                        <Route path="/available-resources" element={<AvailableResources menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
