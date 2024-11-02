import React from 'react';
import AdminDashboard from '../Faculty/Dashboard/dashboard';
import StudentDashboard from '../Students/Dashboard';
import useAuth from '../../../App/useAuth';

function Dashboard() {
  const { role } = useAuth();
  return role.toLowerCase() == 'faculty' ? (
    <AdminDashboard />
  ) : (
    <StudentDashboard />
  );
}

export default Dashboard;
