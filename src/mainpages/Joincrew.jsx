import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applyToJoinCrew, getMyCrewApplication } from '../utils/api';

const Joincrew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [techStack, setTechStack] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [cityState, setCityState] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [codingPlatform, setCodingPlatform] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to /hackathons if status is approved
  useEffect(() => {
    if (user) {
      getMyCrewApplication().then(res => {
        if (res.success && res.data && res.data.status === "approved") {
          navigate("/hackathons");
        }
      });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await applyToJoinCrew(
      mobile,
      techStack,
      college,
      branch,
      cityState,
      linkedin,
      github,
      codingPlatform,
      message
    );
    setLoading(false);
    if (result.success) {
      alert("Application submitted!");
      setMobile('');
      setTechStack('');
      setCollege('');
      setBranch('');
      setCityState('');
      setLinkedin('');
      setGithub('');
      setCodingPlatform('');
      setMessage('');
    } else {
      alert(result.error || "Failed to submit application.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-black text-white">
        <p className="mb-4 text-lg font-semibold">Please login first to join the crew.</p>
        <button
          className="px-6 py-2 bg-white text-black rounded font-bold hover:bg-zinc-200 transition"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] m-10 bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181b] rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6 m-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Join the Crew</h2>
        <label className="text-white font-semibold">
          Mobile Number
          <input
            type="tel"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="Enter your mobile number"
          />
        </label>
        <label className="text-white font-semibold">
          Tech Stack
          <input
            type="text"
            value={techStack}
            onChange={e => setTechStack(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="e.g. MERN, Python, Java"
          />
        </label>
        <label className="text-white font-semibold">
          College
          <input
            type="text"
            value={college}
            onChange={e => setCollege(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="Your College Name"
          />
        </label>
        <label className="text-white font-semibold">
          Branch
          <input
            type="text"
            value={branch}
            onChange={e => setBranch(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="Your Branch"
          />
        </label>
        <label className="text-white font-semibold">
          City & State
          <input
            type="text"
            value={cityState}
            onChange={e => setCityState(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="City, State"
          />
        </label>
        <label className="text-white font-semibold">
          LinkedIn (optional)
          <input
            type="url"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="LinkedIn Profile URL"
          />
        </label>
        <label className="text-white font-semibold">
          GitHub (optional)
          <input
            type="url"
            value={github}
            onChange={e => setGithub(e.target.value)}
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="GitHub Profile URL"
          />
        </label>
        <label className="text-white font-semibold">
          Coding Platform ID (optional)
          <input
            type="text"
            value={codingPlatform}
            onChange={e => setCodingPlatform(e.target.value)}
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="LeetCode/Codeforces/HackerRank ID"
          />
        </label>
        <label className="text-white font-semibold">
          Message (optional)
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="Write a message (optional)"
          />
        </label>
        <button
          type="submit"
          className="bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Joincrew;
