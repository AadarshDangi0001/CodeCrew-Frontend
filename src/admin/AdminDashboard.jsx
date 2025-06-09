import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../utils/api";
import "./AdminPage.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, crew: 0, admins: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(res => {
      if (res.success && Array.isArray(res.data)) {
        setStats({
          users: res.data.length,
          crew: res.data.filter(u => u.status === "approved").length,
          admins: res.data.filter(u => u.isAdmin).length,
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2>Total Users</h2>
            <div className="admin-dashboard-count">{stats.users}</div>
          </div>
          <div className="admin-dashboard-card">
            <h2>Total Crew</h2>
            <div className="admin-dashboard-count">{stats.crew}</div>
          </div>
          <div className="admin-dashboard-card">
            <h2>Total Admins</h2>
            <div className="admin-dashboard-count">{stats.admins}</div>
          </div>
        </div>
      )}
      <div className="admin-dashboard-actions">
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/hackathons")}>Manage Hackathons</button>
      </div>
    </div>
  );
};

export default AdminDashboard;