import React from 'react';
import { FaUser, FaChartLine, FaDiscord } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './SideBar.css'; 

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : '☰'}  {/* Change 'Close' to '✖' (X symbol) */}
      </button>
      <div className={`sidebar-links ${isSidebarOpen ? 'visible' : 'hidden'}`}>
        <button onClick={() => navigate('/users')}>
          <FaUser className="icon" />
          {isSidebarOpen && <span>Users</span>}
        </button>
        <button onClick={() => navigate('/points')}>
          <FaChartLine className="icon" />
          {isSidebarOpen && <span>Points</span>}
        </button>
        <button onClick={() => navigate('/discord')}>
          <FaDiscord className="icon" />
          {isSidebarOpen && <span>Discord</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
