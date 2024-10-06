import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';  // Import the Sidebar component
import apiClient from '../components/utils/axios';  // Axios instance for API requests
import useAuthToken from '../hooks/userAuth';  // Import custom hook for token validation

const Leaderboard = () => {
  useAuthToken();  // Call the custom hook for token validation and refresh

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar state
  const [showModal, setShowModal] = useState(false);  // Modal state
  const [selectedUser, setSelectedUser] = useState(null);  // Store selected user data for modal
  const [loadingUser, setLoadingUser] = useState(false);  // Loading state for modal content
  const [modalError, setModalError] = useState('');  // Error state for modal

  // Fetch the leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiClient.get('/points/leaderboard');
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching leaderboard data.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Function to fetch and display the user details in the modal
  const viewUserDetails = async (identifier) => {
    setLoadingUser(true);
    setModalError('');
    setShowModal(true);  // Show modal
    try {
      const response = await apiClient.get(`/users/viewUser?user_identifier=${identifier}`);
      setSelectedUser(response.data);
      setLoadingUser(false);
    } catch (error) {
      setLoadingUser(false);
      if (error.response && error.response.data.error) {
        setModalError(error.response.data.error);
      } else {
        setModalError('An error occurred while fetching the user details.');
      }
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 p-8 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#ba3554' }}>Leaderboard</h1>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Identifier (Email/UUID)</th>
                <th className="px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-400 hover:text-blue-500 underline"
                      onClick={() => viewUserDetails(user.identifier)}
                    >
                      {user.identifier}
                    </button>
                  </td>
                  <td className="px-4 py-2">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing user details */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto relative">
              <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
                ✖
              </button>

              {loadingUser ? (
                <div className="text-white">Loading user details...</div>
              ) : modalError ? (
                <div className="text-red-500">{modalError}</div>
              ) : selectedUser && (
                <>
                  <h2 className="text-2xl font-bold mb-4">{selectedUser.name}</h2>
                  <p><strong>UUID:</strong> {selectedUser.uuid}</p>
                  <p><strong>Academic Standing:</strong> {selectedUser.academic_standing}</p>
                  <p><strong>Major:</strong> {selectedUser.major}</p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Points Earned</h3>
                  <ul>
                    {selectedUser.points_earned.map((point, index) => (
                      <li key={index} className="mb-2">
                        {point.points} points for {point.event} on {point.timestamp} (Awarded by: {point.awarded_by_officer})
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
