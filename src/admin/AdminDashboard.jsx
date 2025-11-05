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

  if (loading) {
    return (
      <div className="admin-loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-dashboard-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-icon-badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/>
              </svg>
            </div>
            <div>
              <h1 className="admin-main-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Manage your platform with powerful insights</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card-modern">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper users-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-card-title">Total Users</div>
            </div>
            <div className="stat-card-value">{stats.users}</div>
            <div className="stat-card-description">Registered members</div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper crew-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  <polyline points="16 17 21 12 16 7"/>
                </svg>
              </div>
              <div className="stat-card-title">Total Crew</div>
            </div>
            <div className="stat-card-value">{stats.crew}</div>
            <div className="stat-card-description">Approved members</div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper admin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="stat-card-title">Total Admins</div>
            </div>
            <div className="stat-card-value">{stats.admins}</div>
            <div className="stat-card-description">Platform administrators</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
            </svg>
            Quick Actions
          </h2>
          <div className="quick-actions-grid">
            <button className="action-card" onClick={() => navigate("/admin/users")}>
              <div className="action-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="action-content">
                <h3 className="action-title">Manage Users</h3>
                <p className="action-description">View, edit, and manage all registered users</p>
              </div>
              <svg className="action-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button className="action-card" onClick={() => navigate("/admin/hackathons")}>
              <div className="action-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <div className="action-content">
                <h3 className="action-title">Manage Hackathons</h3>
                <p className="action-description">Create, update, and organize hackathon events</p>
              </div>
              <svg className="action-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;