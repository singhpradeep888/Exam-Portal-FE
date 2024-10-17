import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Monitor, BarChart } from 'lucide-react';
import useToken from '../../../App/useToken';

function Landing() {
  const { token } = useToken();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header and Hero Section Combined */}
      <header className="flex  items-start justify-between p-5 bg-white shadow-md rounded-b-lg">
        <div className="text-2xl font-bold text-gray-800">ExamNest</div>
        <nav className="mt-2 space-x-4">
          <a href="#home" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">
            About Us
          </a>
          <a href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact Us
          </a>
        </nav>
        <div className="mt-2 space-x-2">
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                  Dashboard
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-row py-20 bg-white rounded-lg mx-4 mt-5 relative">
        <div className="bg-white p-8 rounded-lg max-w text-left">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">Conduct Seamless, Secure Exams with Ease.</h1>
          <p className="text-lg text-gray-600 mb-8">
            The ultimate platform for creating, managing, and conducting online exams.
          </p>
          <button className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-transform transform ">
            Conduct an Exam Now
          </button>
        </div>
        {/* Background Icon */}
        <div className="relative bottom-0 left-10 w-full ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2828/2828710.png"
            alt="Background Icon"
            className="w-24 h-24 opacity-10 mt-10"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Features</h2>
        <div className="flex  justify-between gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Shield className="h-6 w-6 text-purple-500 mr-2" />,
              title: 'Secure & Reliable',
              description: 'Get exam and data security like nowhere else.',
            },
            {
              icon: <Monitor className="h-6 w-6 text-purple-500 mr-2" />,
              title: 'Live Monitoring',
              description: 'Monitor exams in real-time for complete control.',
            },
            {
              icon: <BarChart className="h-6 w-6 text-purple-500 mr-2" />,
              title: 'Comprehensive Results',
              description: 'Get detailed analysis and performance insights.',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md w-64">
              <h3 className="text-xl font-semibold flex items-center mb-2">
                {feature.icon}
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Set Up',
                description: 'Create your exam and configure security settings.',
                image: 'https://images.pexels.com/photos/6238039/pexels-photo-6238039.jpeg',
              },
              {
                title: 'Conduct',
                description: 'Students take the exam in our secure environment.',
                image: 'https://images.pexels.com/photos/9159069/pexels-photo-9159069.jpeg',
              },
              {
                title: 'Analyze',
                description: 'Review results and get insights on student performance.',
                image: 'https://images.pexels.com/photos/9430883/pexels-photo-9430883.jpeg',
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <img src={step.image} alt={step.title} className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    User Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">&copy; 2024 ExamNest. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
