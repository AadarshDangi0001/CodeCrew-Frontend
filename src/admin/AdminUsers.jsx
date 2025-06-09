import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAllUsers();
    if (res.success) setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">All Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="admin-user-grid">
          {users.map(u => {
            const displayImg =
              u.profileImg ||
              'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(u.name || u.username || 'User') +
                '&background=18181b&color=fff&size=128';

            return (
              <div className="admin-user-card" key={u._id}>
                <img src={displayImg} alt="Profile" className="admin-user-img" />
                <div className="admin-user-info">
                  <div className="admin-user-row">
                    <span className="admin-user-label">Name:</span>
                    <span>{u.name}</span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Email:</span>
                    <span>{u.email}</span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Role:</span>
                    <span>
                      {u.role}
                      {u.isAdmin && (
                        <span style={{  fontSize: 13, marginLeft: 8 }}>
                          (Admin)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Status:</span>
                    <span>{u.status || "Not set"}</span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Mobile:</span>
                    <span>{u.mobileNumber || "Not set"}</span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Message:</span>
                    <span>{u.message || "Not set"}</span>
                  </div>
                  <div className="admin-user-actions">
                    {/* Show Delete button only if not admin and not yourself */}
                    {!u.isAdmin && u._id !== currentUser?._id && (
                      <button className="admin-delete" onClick={() => handleDelete(u._id)}>
                        Delete
                      </button>
                    )}
                    {/* View button is always visible */}
                    <button style={{ marginLeft: 8 }} onClick={() => navigate(`/view-profile/${u._id}`)}>
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;