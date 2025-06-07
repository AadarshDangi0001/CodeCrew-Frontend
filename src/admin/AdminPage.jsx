import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser, getHackathons, addHackathon, updateHackathon, deleteHackathon } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./AdminPage.css";

const AdminPage = () => {
  const [tab, setTab] = useState("users");
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-tabs">
        <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>Users</button>
        <button className={tab === "hackathons" ? "active" : ""} onClick={() => setTab("hackathons")}>Hackathons</button>
      </div>
      <div className="admin-content">
        {tab === "users" ? <UserAdmin /> : <HackathonAdmin />}
      </div>
    </div>
  );
};

// --- Users Tab ---
const UserAdmin = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h2>All Users</h2>
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
                    <span>{u.role}</span>
                  </div>
                  <div className="admin-user-row">
                    <span className="admin-user-label">Status:</span>
                    <span>{u.status || "Not set"}</span>
                  </div>
                  {u.status === "approved" && (
                    <>
                      <div className="admin-user-row">
                        <span className="admin-user-label">Mobile:</span>
                        <span>{u.mobileNumber || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">Tech Stack:</span>
                        <span>{u.techStack || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">College:</span>
                        <span>{u.college || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">Branch:</span>
                        <span>{u.branch || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">City/State:</span>
                        <span>{u.cityState || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">LinkedIn:</span>
                        {u.linkedin ? (
                          <a href={u.linkedin} target="_blank" rel="noopener noreferrer" className="admin-user-link">{u.linkedin}</a>
                        ) : "Not set"}
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">GitHub:</span>
                        {u.github ? (
                          <a href={u.github} target="_blank" rel="noopener noreferrer" className="admin-user-link">{u.github}</a>
                        ) : "Not set"}
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">Coding Platform:</span>
                        <span>{u.codingPlatform || "Not set"}</span>
                      </div>
                      <div className="admin-user-row">
                        <span className="admin-user-label">Message:</span>
                        <span>{u.message || "Not set"}</span>
                      </div>
                    </>
                  )}
                  <div className="admin-user-actions">
                    {u.isAdmin
                      ? <span style={{ color: "#888", fontSize: 12 }}>Admin</span>
                      : u._id !== currentUser?._id
                        ? <button className="admin-delete" onClick={() => handleDelete(u._id)}>Delete</button>
                        : <span style={{ color: "#888", fontSize: 12 }}>You</span>
                    }
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

// --- Hackathons Tab ---
const HackathonAdmin = () => {
  const [hacks, setHacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    link: "",
    prizePool: "",
    description: "",
    techStack: "",
    date: "",
    rounds: "",
    venue: "",
    entryFee: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchHacks = async () => {
    setLoading(true);
    const res = await getHackathons();
    if (res.success) setHacks(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchHacks(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hackathon?")) return;
    await deleteHackathon(id);
    fetchHacks();
  };

  const handleEdit = (hack) => {
    setEditId(hack._id);
    setForm({
      name: hack.name || "",
      contactNumber: hack.contactNumber || "",
      link: hack.link || "",
      prizePool: hack.prizePool || "",
      description: hack.description || "",
      techStack: hack.techStack || "",
      date: hack.date ? hack.date.slice(0, 10) : "",
      rounds: hack.rounds || "",
      venue: hack.venue || "",
      entryFee: hack.entryFee || "",
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) data.append(key, value);
      else if (key !== "image") data.append(key, value);
    });

    if (editId) {
      await updateHackathon(editId, data);
      setEditId(null);
    } else {
      await addHackathon(data);
    }
    setForm({
      name: "",
      contactNumber: "",
      link: "",
      prizePool: "",
      description: "",
      techStack: "",
      date: "",
      rounds: "",
      venue: "",
      entryFee: "",
      image: null,
    });
    fetchHacks();
  };

  return (
    <div>
      <h2>{editId ? "Edit" : "Add"} Hackathon</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Contact Number" value={form.contactNumber} onChange={e => setForm({ ...form, contactNumber: e.target.value })} required />
        <input type="text" placeholder="Link" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} required />
        <input type="text" placeholder="Prize Pool" value={form.prizePool} onChange={e => setForm({ ...form, prizePool: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input type="text" placeholder="Tech Stack" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} required />
        <input type="date" placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input type="text" placeholder="Rounds" value={form.rounds} onChange={e => setForm({ ...form, rounds: e.target.value })} required />
        <input type="text" placeholder="Venue" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} required />
        <input type="text" placeholder="Entry Fee" value={form.entryFee} onChange={e => setForm({ ...form, entryFee: e.target.value })} required />
        <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: "", contactNumber: "", link: "", prizePool: "", description: "", techStack: "", date: "", rounds: "", venue: "", entryFee: "", image: null }); }}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Link</th>
              <th>Prize Pool</th>
              <th>Description</th>
              <th>Tech Stack</th>
              <th>Date</th>
              <th>Rounds</th>
              <th>Venue</th>
              <th>Entry Fee</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hacks.map(h => (
              <tr key={h._id}>
                <td>{h.name}</td>
                <td>{h.contactNumber}</td>
                <td><a href={h.link} target="_blank" rel="noopener noreferrer">Link</a></td>
                <td>{h.prizePool}</td>
                <td>{h.description}</td>
                <td>{h.techStack}</td>
                <td>{h.date ? new Date(h.date).toLocaleDateString() : ""}</td>
                <td>{h.rounds}</td>
                <td>{h.venue}</td>
                <td>{h.entryFee}</td>
                <td>
                  {h.image && <img src={h.image} alt="" style={{ width: 60, borderRadius: 8 }} />}
                </td>
                <td>
                  <button onClick={() => handleEdit(h)}>Edit</button>
                  <button className="admin-delete" onClick={() => handleDelete(h._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;