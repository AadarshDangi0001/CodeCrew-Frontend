import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "../pages/AboutPage.jsx";
import Contact from "../pages/ContactPage.jsx";
import Hackathons from "../mainpages/Hackathons.jsx";
import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/hackathons" element={<Hackathons />} />
   
    <Route path="*" element={<NotFound />} /> 
  </Routes>
);

export default AppRoutes;