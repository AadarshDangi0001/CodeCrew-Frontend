import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserAndCrew, updateProfile, updateCrewDetails } from "../utils/api";


const UpdateProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    profileImg: "",
    mobileNumber: "",
    techStack: "",
    college: "",
    branch: "",
    cityState: "",
    linkedin: "",
    github: "",
    codingPlatform: "",
  });
  const [crewId, setCrewId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [crewStatus, setCrewStatus] = useState("approved"); // default to approved

  useEffect(() => {
    getUserAndCrew().then(res => {
      if (res.success) {
        const { user: u, crew } = res.data;
        setForm({
          name: u.name || "",
          email: u.email || "",
          profileImg: u.profileImg || "",
          mobileNumber: crew?.mobileNumber || "",
          techStack: crew?.techStack || "",
          college: crew?.college || "",
          branch: crew?.branch || "",
          cityState: crew?.cityState || "",
          linkedin: crew?.linkedin || "",
          github: crew?.github || "",
          codingPlatform: crew?.codingPlatform || "",
        });
        setCrewId(crew?._id || null);
        setCrewStatus(crew?.status || "not_applied");
      }
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = e => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    // Update user (with profile image)
    const { name, email } = form;
    const profileImgFile = imgFile;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImgFile) formData.append("profileImg", profileImgFile);
    const result = await updateProfile(formData);
    if (!result.success) {
      alert(result.message || "Profile update failed");
      setSaving(false);
      return;
    }

    // Update crew details
    if (crewId) {
      await updateCrewDetails({
        mobileNumber: form.mobileNumber,
        techStack: form.techStack,
        college: form.college,
        branch: form.branch,
        cityState: form.cityState,
        linkedin: form.linkedin,
        github: form.github,
        codingPlatform: form.codingPlatform,
      });
    }

    setSaving(false);
    alert("Profile updated!");
    navigate("/profile", { replace: true });
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  const notApproved = crewStatus !== "approved";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center mt-20 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181b] rounded-lg shadow-lg p-8 w-full max-w-lg flex flex-col gap-6 relative"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Update Profile</h2>
        <label className="text-white font-semibold">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
          />
        </label>
        <label className="text-white font-semibold">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
          />
        </label>
        <label className="text-white font-semibold">
          Profile Image
          {form.profileImg && (
            <img
              src={form.profileImg}
              alt="Current Profile"
              className="w-20 h-20 rounded-full border-2 border-white mb-2 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
          />
        </label>

        {notApproved ? (
          <div className="flex flex-col items-center justify-center my-8">
            <div className="text-white text-lg font-bold mb-4 text-center">
              Join Crew to unlock all details!
            </div>
            <button
              type="button"
              className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-zinc-200 transition"
              onClick={() => navigate('/joincrew')}
            >
              Join Crew
            </button>
          </div>
        ) : (
          <>
            <label className="text-white font-semibold">
              Mobile Number
              <input
                type="tel"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              Tech Stack
              <input
                type="text"
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              College
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              Branch
              <input
                type="text"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              City & State
              <input
                type="text"
                name="cityState"
                value={form.cityState}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              LinkedIn
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              GitHub
              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
            <label className="text-white font-semibold">
              Coding Platform ID
              <input
                type="text"
                name="codingPlatform"
                value={form.codingPlatform}
                onChange={handleChange}
                className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-white"
              />
            </label>
          </>
        )}

        <button
          type="submit"
          className="bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition mt-4"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;