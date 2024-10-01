import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../components/points/api';
import Sidebar from '../components/SideBar'; // Import the Sidebar component
import './PointsSystem.css'; // Custom styling

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard();
        console.log("Fetched leaderboard data:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-container">
      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? 'shrink' : ''}`}>
        <div className="leaderboard-container">
          <h2>Leaderboard</h2>
          <ul>
            {users.map((user, index) => (
              <li key={`${user.name}-${index}`}>
                {user.name}: {user.points} points
              </li>
            ))}
          </ul>
        </div>

        <div className="functions-container">
          <h2>Functions</h2>
          <button onClick={() => navigate('/points/add')}>Add Points</button>
          <button onClick={() => navigate('/points/remove')}>Remove Points</button>
          <button onClick={() => navigate('/points/logs')}>Logs</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
