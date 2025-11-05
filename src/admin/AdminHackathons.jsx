import React, { useState, useEffect } from "react";
import { getHackathons, addHackathon, updateHackathon, deleteHackathon } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminHackathons = () => {
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
  const navigate = useNavigate();

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
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) {
        data.append(key, value);
      } else if (key !== "image") {
        data.append(key, value);
      }
    });

    try {
      let result;
      if (editId) {
        result = await updateHackathon(editId, data);
      } else {
        result = await addHackathon(data);
      }
      
      if (result.success) {
        // Reset form and editId
        setEditId(null);
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
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        // Refresh the list
        fetchHacks();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save hackathon. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditId(null);
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
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">{editId ? "Edit" : "Add"} Hackathon</h2>
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
        {editId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hacks.map(h => (
              <tr key={h._id}>
                <td>{h.name}</td>
                <td>{h.date ? new Date(h.date).toLocaleDateString() : ""}</td>
                <td>{h.venue}</td>
                <td>
                  <button onClick={() => handleEdit(h)}>Edit</button>
                  <button className="admin-delete" onClick={() => handleDelete(h._id)}>Delete</button>
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={() => navigate(`/hackathon-detail/${h._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHackathons;