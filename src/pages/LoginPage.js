// src/pages/LoginPage.js
import React from 'react';

const LoginPage = () => {
    // Function to handle login
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/login';  // Redirect to your Flask backend login route
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">SoDA at ASU</h1>
                <p className="mb-6 text-center">Log in with your Discord account to continue</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-center text-white font-semibold transition-colors duration-300"
                    >
                        Login with Discord
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
