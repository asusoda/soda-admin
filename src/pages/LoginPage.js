// src/pages/LoginPage.js
import React from 'react';

const LoginPage = () => {
  const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">SoDA at ASU</h1>
        <p className="mb-6 text-center">Log in with your Discord account to continue</p>
        <a
          href={discordAuthURL}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-center text-white font-semibold transition-colors duration-300"
        >
          Login with Discord
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
