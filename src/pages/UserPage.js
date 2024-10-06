import React, { useState } from 'react';
import Sidebar from '../components/SideBar';  // Import Sidebar component
import apiClient from '../components/utils/axios';  // Axios instance for API requests
import useAuthToken from '../hooks/userAuth';  // Custom hook to validate and refresh token

const UserPage = () => {
  useAuthToken();  // Validate and refresh token

  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar open state

  // Form input state for user info
  const [name, setName] = useState('');
  const [asuId, setAsuId] = useState('');
  const [academicStanding, setAcademicStanding] = useState('');
  const [major, setMajor] = useState('');

  // Function to fetch user details
  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await apiClient.get(`/users/user?email=${email}`);
      setUserData(response.data);

      // Pre-fill the form fields with the existing user data
      setName(response.data.name);
      setAsuId(response.data.asu_id);
      setAcademicStanding(response.data.academic_standing);
      setMajor(response.data.major);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while fetching the user.');
      }
    }
  };

  // Function to update user details
  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const data = {
      name,
      asu_id: asuId,
      academic_standing: academicStanding,
      major,
    };

    try {
      const response = await apiClient.post('/users/user', { email, ...data });
      setSuccessMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while updating the user.');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <div className={`flex-1 p-8 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#ba3554' }}>User Management</h1>

        {/* Form to fetch user details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-4">Find User by Email</h2>
          <input
            type="email"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={fetchUser}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch User'}
          </button>
        </div>

        {/* Display and update user details */}
        {userData && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Update User Information</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={updateUser}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">ASU ID</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  value={asuId}
                  onChange={(e) => setAsuId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Academic Standing</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  value={academicStanding}
                  onChange={(e) => setAcademicStanding(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Major</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update User'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
