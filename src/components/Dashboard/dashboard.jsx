// App.js
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../App/useToken';

function Dashboard() {
  const navigateTo = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    if (!token) navigateTo('/Login');
  }, [token, navigateTo]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h1>Welcome to the Dashboard</h1>
        {/* Add other content or routes here */}
      </div>
    </div>
  );
}

export default Dashboard;
