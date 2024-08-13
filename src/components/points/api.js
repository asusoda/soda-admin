import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000/points-system";

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    throw error;
  }
};

export const addPoints = async (userId, eventName, points) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-points`, {
      user_id: userId,
      event: eventName,
      points: points
    });
    return response.data;
  } catch (error) {
    console.error("Error adding points", error);
    throw error;
  }
};

export const removePoints = async (userId, points) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/remove-points`, {
      user_id: userId,
      points: points
    });
    return response.data;
  } catch (error) {
    console.error("Error removing points", error);
    throw error;
  }
};
