import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Users, CheckCircle, Menu } from 'lucide-react';

function Landing() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-blue-600">ExamStep</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About Us</Button>
            <Button variant="ghost">Contact Us</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/Login">
              <Button variant="primary" className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-lg transform ">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-lg transform">Signup</Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-lg">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-900 sm:text-6xl md:text-7xl animate-fadeIn">
            Welcome to the Secure Exam Portal
          </h1>
          <p className="mt-3 max-w-lg mx-auto text-gray-600 text-lg md:text-xl animate-fadeIn">
            Conduct exams with confidence using our secure platform. Protect the integrity of your assessments.
          </p>
          <div className="mt-5 flex justify-center space-x-4">
            <Button variant="primary" size="lg" className="transition-transform hover:scale-105 bg-blue-600 text-white">Get Started</Button>
            <Button variant="outline" size="lg" className="transition-transform hover:scale-105">Learn More</Button>
          </div>
        </section>

        {/* Feature Highlight Section */}
        <section className="mb-16">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/40 to-transparent flex items-center">
              <div className="p-8">
                <h2 className="text-4xl font-bold text-white mb-4">Advanced Security Features</h2>
                <p className="text-white text-lg mb-6">Our platform ensures exam integrity with cutting-edge technology.</p>
                <Button size="lg" className="transition-transform hover:scale-105 bg-blue-700 text-white">Explore Features</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <Lock className="h-5 w-5 mr-2" />
                Secure Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src="https://plus.unsplash.com/premium_photo-1676618539992-21c7d3b6df0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJlfGVufDB8fDB8fHww" alt="secure" />
              <CardDescription className="mt-4">Our secure portal prevents unauthorized access during exams.</CardDescription>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <Users className="h-5 w-5 mr-2" />
                AI-Powered Proctoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img className="h-48" src="https://media.istockphoto.com/id/1168365129/photo/authentication-by-facial-recognition-concept-biometric-security-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=zrmmhBkryRrqMZI6Dc440BLlsCh-ejqq9Qr0WvvqR0c=" alt="" />
              <CardDescription className="mt-4">AI algorithms monitor student behavior to detect cheating attempts.</CardDescription>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <CheckCircle className="h-5 w-5 mr-2" />
                Verified Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src="https://media.istockphoto.com/id/2124267004/photo/check-mark-symbol-3d-glossy-icon-on-abstract-futuristic-background-success-solution.webp?a=1&b=1&s=612x612&w=0&k=20&c=tYX_01sp29f5e5FHlhjq6NqrqlJnodLjuYJMqXDImF0=" alt="" />
              <CardDescription className="mt-4">Ensure the authenticity of results with our robust verification system.</CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-16">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Exams?</h2>
              <p className="text-lg">Join institutions using SecureExam for reliable assessments.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Enter your email" className="bg-blue text-gray-900" />
              <Button variant="secondary" className="bg-blue-900 text-white">Get Started</Button>
            </form>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Set Up",
                description: "Create your exam and configure security settings.",
                image: "https://images.pexels.com/photos/6238039/pexels-photo-6238039.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Conduct",
                description: "Students take the exam in our secure environment.",
                image: "https://images.pexels.com/photos/9159069/pexels-photo-9159069.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Analyze",
                description: "Review results and get insights on student performance.",
                image: "https://images.pexels.com/photos/9430883/pexels-photo-9430883.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <img
                  src={step.image}
                  alt={`Step ${index + 1}: ${step.title}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-white mt-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">User Guids</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Email Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>&copy; 2024 SecureExam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
