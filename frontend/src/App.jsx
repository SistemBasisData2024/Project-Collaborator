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
import MyProjectPage from "./pages/MyProjectPage/MyProjectPage";
import MyReviewPage from "./pages/MyReviewPage/MyReviewPage";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";
import { UserProvider } from "./contexts/UserContext";
import MyReviewPages from "./pages/MyReviewPages/MyReviewPages";


const App = () => {
  return (
    <Router>
      <UserProvider>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<LandingPage />} /> {/* Placeholder */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomeProjectPage />} />
            <Route path="/homes" element={<HomeUserPage />} />
            <Route path="/project/:projectId" element={<DetailPage />} />
            <Route path="/myapp" element={<MyApplicationPage />} />
            <Route path="/myapps" element={<MyApplicationPages />} />
            <Route path="/myprojects" element={<MyProjectPage />} />
            <Route path="/myreview" element={<MyReviewPage/>} />
            <Route path="/myreviews" element={<MyReviewPages/>} />
            <Route path="/setting" element={<ProfileSetting />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
