// Sidebar.js
import React from 'react';
import './sidebar.css';
import useToken from '../../../App/useToken';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { setToken } = useToken();
  const navigateTo = useNavigate();

  async function handleLogout(e) {
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
      setToken(false);
      navigateTo('/');
    } catch (error) {
      console.error(`Logout error: ${error.message}`);
    }
  }

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
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
