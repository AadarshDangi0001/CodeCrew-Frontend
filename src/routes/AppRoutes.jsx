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

import ProtectedAdminRoute from "./ProtectedAdminRoute";
import HackathonDetail from "../mainpages/HackathonDetail"; // Create this file
import AdminDashboard from '../admin/AdminDashboard';
import AdminUsers from '../admin/AdminUsers';
import AdminHackathons from '../admin/AdminHackathons.jsx';
import ViewProfile from "../mainpages/ViewProfile"; // Create this file

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
    <Route
      path="/admin"
      element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedAdminRoute>
          <AdminUsers />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin/hackathons"
      element={
        <ProtectedAdminRoute>
          <AdminHackathons />
        </ProtectedAdminRoute>
      }
    />
    <Route path="/hackathon-detail/:id" element={<HackathonDetail />} />
    <Route path="/view-profile/:id" element={<ViewProfile />} />
  </Routes>
);

export default AppRoutes;