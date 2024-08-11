// src/pages/DiscordCallback.js
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const DiscordCallback = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');

      if (code) {
        try {
          const response = await fetch('/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (response.ok) {
            const data = await response.json();
            // Store the token or user info in your state management solution (e.g., context, redux)
            // Redirect the user to the desired page
            history.push('/profile');
          } else {
            console.error('Failed to fetch the access token');
          }
        } catch (error) {
          console.error('Error during the OAuth2 process', error);
        }
      } else {
        console.error('No authorization code found');
      }
    };

    fetchToken();
  }, [location, history]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p>Logging in with Discord...</p>
    </div>
  );
};

export default DiscordCallback;
