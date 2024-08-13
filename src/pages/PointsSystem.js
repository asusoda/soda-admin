import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../components/points/api';
import './PointsSystem.css'; // Optional: Create a CSS file for styling

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard();
        console.log("Fetched leaderboard data:", data); // Debugging line
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main-container">
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
  );
};

export default Leaderboard;
