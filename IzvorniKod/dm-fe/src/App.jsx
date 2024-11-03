import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Map from "./components/Map/Map.jsx";
import BottomButtons from "./components/BottomButtons/BottomButtons.jsx";
import AddWeatherReports from "./components/AddWeatherReports/AddWeatherReports.jsx";
import WeatherReportForm from "./components/WeatherReportForm/WeatherReportForm.jsx";
import LoginForm from "./components/Login/Login.jsx";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <div className={`app ${isLoginOpen ? "blurred" : ""}`}>
      <div className={`background-content ${reportType ? "blurred" : ""}`}>
        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onLoginOpen={handleLoginOpen}
        />
        {menuOpen && <Menu />}
        <Map />
        {addReportOpen && <AddWeatherReports openReportForm={openReportForm} />}
      </div>

      {reportType && (
        <WeatherReportForm
          type={reportType}
          closeReportForm={closeReportForm}
        />
      )}
      <BottomButtons setAddReportOpen={setAddReportOpen} />

      {isLoginOpen && (
        <div className="login-overlay">
          <LoginForm handleLoginClose={handleLoginClose} />
        </div>
      )}
    </div>
  );
}

export default App;
