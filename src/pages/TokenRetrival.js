// src/pages/DiscordCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TokenRetrival = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      if (!location.search.includes('code')) {
        return navigate('/500'); // Redirect to error page
      }
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      if (code) {
        localStorage.setItem('accessToken', code);
        // Optionally, navigate to another page after setting the token
        navigate('/points'); // Redirect after successful token retrieval
      } else {
        navigate('/500'); // Redirect to error page if no code
      }
    };

    fetchToken();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      console.log(localStorage.getItem('accessToken'));
      <p>Logging in with Discord...</p>
    </div>
  );
};

export default TokenRetrival;
