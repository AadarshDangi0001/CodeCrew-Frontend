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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <GoogleLoginButton text="Continue with Google" />
        <form
          onSubmit={handleSubmit}
          className="bg-[#18181b] p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6 m-10"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-4">REGISTER</h2>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              className="p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm" htmlFor="email">Gmail</label>
            <input
              id="email"
              type="email"
              required
              className="p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
              placeholder="Enter your Gmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="p-3 rounded bg-zinc-900 text-white outline-none border border-zinc-700 focus:border-white"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition"
          >
            Register
          </button>
          <p className="text-center text-zinc-400 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
