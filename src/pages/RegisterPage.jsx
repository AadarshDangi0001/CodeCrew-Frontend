import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from "../components/GoogleLoginButton";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // get login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(username, email, password);
    if (result.success) {
      // Automatically log in after registration
      const loginResult = await login(email, password);
      if (loginResult.success) {
        navigate('/');
      } else {
        alert("Registered, but login failed. Please login manually.");
        navigate('/login');
      }
    } else {
      alert(result.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#0b0b0d] to-[#0f0f11] border border-zinc-800 rounded-2xl shadow-2xl p-8 m-6">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-wider">Create Account</h1>
            <p className="text-zinc-400 mt-1">Join Code Crew to participate in events and crew activities</p>
          </div>

          <div className="mb-4">
            <GoogleLoginButton text="Continue with Google" />
          </div>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-zinc-700" />
            <span className="text-zinc-500 text-sm">or</span>
            <hr className="flex-1 border-zinc-700" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col text-sm text-zinc-300">
              <span className="mb-1">Username</span>
              <input
                id="username"
                type="text"
                required
                className="p-3 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-800 focus:ring-2 focus:ring-indigo-500"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label className="flex flex-col text-sm text-zinc-300">
              <span className="mb-1">Email</span>
              <input
                id="email"
                type="email"
                required
                className="p-3 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-800 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <label className="flex flex-col text-sm text-zinc-300">
              <span className="mb-1">Password</span>
              <input
                id="password"
                type="password"
                required
                className="p-3 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-800 focus:ring-2 focus:ring-indigo-500"
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </label>

            <button
              type="submit"
              className="mt-2 bg-white text-black font-semibold py-3 rounded-lg hover:opacity-95 transition"
            >
              Register
            </button>

            <p className="text-center text-zinc-400 text-sm mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
