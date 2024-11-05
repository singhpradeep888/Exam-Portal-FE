import React from 'react';
import Sidebar from '/src/components/Faculty/Sidebar/sidebar';

export default function Dashboard() {

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