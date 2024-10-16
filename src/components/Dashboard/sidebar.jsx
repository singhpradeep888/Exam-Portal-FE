// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Add CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/exams">Exams</a>
          </li>
          <li>
            <a href="/group">Group</a>
          </li>
        </ul>
      </div>
      <div className="logout">
        <button className="logout-button" onClick={() => prompt('are you sure')}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
