import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Users, CheckCircle, Menu } from 'lucide-react';
// import Login from '@/components/LoginFrom/Login';


function Landing() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-blue-600">NextStep</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About Us</Button>
            <Button variant="ghost">Contact Us</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/Login">
              <Button variant="outline" className="shadow-lg transition transform hover:scale-105">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="shadow-lg transition transform hover:scale-105">Signup</Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-lg">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl md:text-6xl">
            Welcome to the portal
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Conduct exams with confidence using our state-of-the-art secure platform. Protect the integrity of your assessments and empower your students.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button variant="outline" size="lg" className="w-full sm:w-auto transition transform hover:scale-105">Get Started</Button>
            <Button variant="outline" size="lg" className="  mt-3 w-full sm:mt-0 sm:ml-3 sm: sm:w-auto transition transform hover:scale-105 ">
              Learn More
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1680807869086-e08309acfb24?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
              alt="Secure exam platform interface"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-transparent flex items-center">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Advanced Security Features</h2>
                <p className="text-white text-lg mb-6">Our platform uses cutting-edge technology to ensure exam integrity and prevent cheating.</p>
                <Button size="lg" className="transition transform hover:scale-105">Explore Features</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="transition transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <Lock className="h-5 w-5 mr-2" />
                Secure Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src="https://plus.unsplash.com/premium_photo-1676618539992-21c7d3b6df0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJlfGVufDB8fDB8fHww" alt="secure" />
              <CardDescription>Our lockdown browser prevents access to unauthorized resources during exams.</CardDescription>
            </CardContent>
          </Card>
          <Card className="transition transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <Users className="h-5 w-5 mr-2" />
                AI-Powered Proctoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img className='h-48' src="https://media.istockphoto.com/id/1168365129/photo/authentication-by-facial-recognition-concept-biometric-security-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=zrmmhBkryRrqMZI6Dc440BLlsCh-ejqq9Qr0WvvqR0c=" alt="" />
              <CardDescription className="mt-2">Advanced AI algorithms monitor student behavior to detect and prevent cheating attempts.</CardDescription>
            </CardContent>
          </Card>
          <Card className="transition transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-500">
                <CheckCircle className="h-5 w-5 mr-2" />
                Verified Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src="https://media.istockphoto.com/id/2124267004/photo/check-mark-symbol-3d-glossy-icon-on-abstract-futuristic-background-success-solution.webp?a=1&b=1&s=612x612&w=0&k=20&c=tYX_01sp29f5e5FHlhjq6NqrqlJnodLjuYJMqXDImF0=" alt="" />
              <CardDescription>Ensure the authenticity of exam results with our robust verification system.</CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-16">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Exams?</h2>
              <p className="text-lg">Join thousands of institutions using SecureExam for reliable online assessments.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900" />
              <Button variant="secondary" className="bg-blue text-gray-700 transition transform hover:scale-105">Get Started</Button>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Support</a></li>
              </ul>
            </div>
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
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
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
