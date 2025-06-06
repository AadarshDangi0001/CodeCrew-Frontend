import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applyToJoinCrew } from '../utils/api'; // <-- import the API

const Joincrew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await applyToJoinCrew(mobile, message);
    setLoading(false);
    if (result.success) {
      alert("Application submitted!");
      setMobile('');
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
          Message
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            className="block w-full mt-1 p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
            placeholder="Why do you want to join?"
            rows={4}
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
