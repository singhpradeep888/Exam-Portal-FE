// Sidebar.js
import React from 'react';
import './sidebar.css';
import useAuth from '../../../App/useAuth';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import { HomeIcon, UserIcon, UserGroupIcon, FolderIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { setAuthenticated, setVerified } = useAuth();
  const navigateTo = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'GET',
        credentials: 'include',
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
    <div className="flex bg-blue-600 relative h-screen top-0 bottom-0 left-0 w-80 px-4 py-8 align-top flex-col gap-8 ">
      {/* Header */}
      <div className="flex justify-center h-10 w-full">
        <img src={logo} alt="" />
      </div>
      {/* Navbar */}
      <div className='flex flex-col gap-4'>
        <a href='/dashboard' className="text-white flex align-middle px-4 py-3 w-full rounded hover:bg-blue-700">
          <HomeIcon className="size-6 text-white me-2" /> Dashboard
        </a>
        <a href='#' className="text-white flex align-middle px-4 py-3 w-full rounded hover:bg-blue-700">
          <UserGroupIcon className="size-6 text-white me-2" /> Groups
        </a>
        <a href='/exams' className="text-white flex align-middle px-4 py-3 w-full rounded hover:bg-blue-700">
          <FolderIcon className="size-6 text-white me-2" /> Exams
        </a>
        <a href='#' className="text-white flex align-middle px-4 py-3 w-full rounded hover:bg-blue-700">
          <PresentationChartBarIcon className="size-6 text-white me-2" /> Result
        </a>
      </div>
      {/* Footer */}
      <div className='bottom-0 absolute -ms-4 w-full p-4'>
       <button type="button" onClick={handleLogout} className='rounded-lg p-4 text-blue-600 font-medium bg-white w-full'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
