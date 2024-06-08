// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import HomePages from "./pages/HomePages";

const App = () => {
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/find-collaborator" element={<LandingPage />} /> {/* Placeholder */}
          <Route path="/find-projects" element={<LandingPage />} /> {/* Placeholder */}
          <Route path="/profile" element={<LandingPage />} /> {/* Placeholder */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/homes" element={<HomePages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
