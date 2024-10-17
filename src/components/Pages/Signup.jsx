import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }
      navigate('/');
    } catch (error) {
      setError('An error occurred');
      console.error(`Signup error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <img
        src="loginsignup.jpg"
        alt="Signup"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>

        {error && <p className="text-red-500 p-2 px-4 mb-4 bg-red-100 rounded-md">{error}</p>}

        <form onSubmit={handleSignup} className="mt-6">
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 transform "
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-700 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
