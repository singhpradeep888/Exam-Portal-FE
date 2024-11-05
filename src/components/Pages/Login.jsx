import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../App/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigateTo = useNavigate();
  const { isAuthenticated, setAuthenticated, setVerified, setRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/dashboard');
    }
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      const user = data.userData;
      if (!response.ok) {
        setError(data.message);
        return;
      } 
      setAuthenticated(true);
      setVerified(user.verified);
      setRole(user.role);
      navigateTo('/dashboard');
    } catch (error) {
      setError('An error occurred');
      console.error(`Login error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <img
        src="loginsignup.jpg"
        alt="Login"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Login
        </h2>

        {error && (
          <p className="text-red-500 p-2 px-4 mb-4 bg-red-100 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-700 text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
