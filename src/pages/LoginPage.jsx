import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#0b0b0d] to-[#0f0f11] border border-zinc-800 rounded-2xl shadow-2xl p-8 m-6">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-wider">Welcome Back</h1>
            <p className="text-zinc-400 mt-1">Login to access your dashboard and crew features</p>
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
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            <button
              type="submit"
              className="mt-2 bg-white text-black font-semibold py-3 rounded-lg hover:opacity-95 transition"
            >
              Login
            </button>

            <p className="text-center text-zinc-400 text-sm mt-3">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
