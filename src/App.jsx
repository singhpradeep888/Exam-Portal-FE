import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Dashboard from './components/Dashboard/dashboard';
import VerifyEmail from './components/Pages/VerifyEmail';
import ProtectedRoute from '../App/ProtectedRoute';
import Exams from './components/Faculty/Exams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/exams' element={<Exams />} />
        </Route>
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path='*' element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
