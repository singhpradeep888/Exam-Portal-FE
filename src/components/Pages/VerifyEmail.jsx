import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../App/useAuth';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const navigateTo = useNavigate();
  const { isVerified, setVerified, setAuthenticated } = useAuth();

  useEffect(() => {
    if (isVerified) {
      navigateTo('/dashboard');
    }
  }, [isVerified, navigateTo]);

  async function verifyOtp(e) {
    e.preventDefault();

    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/verify-email', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }
      setVerified(true);
      navigateTo('/dashboard');
    } catch (err) {
      setError('An error occured, please try again later');
      console.log(`OTP Verification Error:: ${err.message}`);
    }
  }

  async function resendOTP(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/resend-email', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      alert('Email sent successfully');
    } catch (err) {
      setError('Failed to resend email, try again later');
      console.log(`Resend OTP Error:: ${err.message}`);
    }
  }

  async function logoutHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });  
      if (!response.ok) {
        console.error('Failed to log out user');
        return;
      }
      setAuthenticated(false);
      setVerified(false);
      navigateTo('/');
    } catch (error) {
      console.error(`Logout error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <img src="loginsignup.jpg" alt="Verify" className="absolute inset-0 object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl">
        {error && <p className="text-red-500 p-2 px-4 mb-4 bg-red-100 rounded-md">{error}</p>}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Enter OTP</h2>
        <p>
          A <b>6-digit</b> OTP has been sent to your registered email, please enter the OTP.
        </p>
        <form onSubmit={verifyOtp} className="mt-2">
          <div className="mb-4">
            <input
              type="number"
              id="username"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="XXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <p className="mt-2 text-gray-700">
              <button type="button" style={{ color: 'blue' }} onClick={resendOTP}>
                Resend OTP
              </button>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 transform "
          >
            Verify
          </button>
        </form>
        <p className="mt-4 text-gray-700 text-center">
          <button type="button" style={{ color: 'red' }} onClick={logoutHandler}>
            Logout
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
