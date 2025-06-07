import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "../pages/AboutPage.jsx";
import Contact from "../pages/ContactPage.jsx";
import Hackathons from "../mainpages/Hackathons.jsx";
import NotFound from "../pages/NotFound.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import Joincrew from "../mainpages/Joincrew.jsx";
import Crew from "../mainpages/Crew.jsx";
import Profile from "../mainpages/Profile.jsx";
import UpdateProfile from "../mainpages/UpdateProfile.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/hackathons" element={<Hackathons />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<NotFound />} /> 
    <Route path="/joincrew" element={<Joincrew/>} />
    <Route path="/crew" element={<Crew/>} />
    <Route path = "/profile" element={<Profile/>} />
    <Route path="/update-profile" element={<UpdateProfile />} />
  </Routes>
);

export default AppRoutes;