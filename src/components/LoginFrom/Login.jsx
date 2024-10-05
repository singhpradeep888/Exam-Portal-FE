import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3000/auth/login',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/JSON',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
        []
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }
      navigate('/');
    } catch (error) {
      setError('An error occurred');
      console.error(`Login error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-600 to-white-100 flex">
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src="https://media.istockphoto.com/id/1409612797/photo/concept-of-cyber-security-in-two-step-verification-multi-factor-authentication-information.jpg?b=1&s=612x612&w=0&k=20&c=GdERVWlCprA3LULruBEoL7M4Wv95H0SkKj22FbgQQCs="
          alt="Login"
          className="object-cover w-full h-full rounded-l-lg shadow-lg transition duration-500 transform hover:scale-105"
        />

        <div className="absolute inset-0 bg-black opacity-30 rounded-l-lg"></div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

          {error && <p className="text-red-500 p-2 px-4 mt-4 bg-red-50 rounded-md">{error}</p>}

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-700 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
