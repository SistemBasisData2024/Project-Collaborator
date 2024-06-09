// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import HomeProjectPage from "./pages/HomeProjectPage/HomeProjectPage";
import HomeUserPage from "./pages/HomeUserPages/HomeUserPage";

import DetailPage from "./pages/DetailPage/DetailPage";
import MyApplicationPage from "./pages/MyApplicationsPage/MyApplicationPage";
import MyApplicationPages from "./pages/MyApplicationsPages/MyApplicationPages";


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
          <Route path="/home" element={<HomeProjectPage />} />
          <Route path="/homes" element={<HomeUserPage />} />
          <Route path="/detail/:projectId" element={<DetailPage />} />
          <Route path="/myapp" element={<MyApplicationPage />} />
          <Route path="/myapps" element={<MyApplicationPages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
