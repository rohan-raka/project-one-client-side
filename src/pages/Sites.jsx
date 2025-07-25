import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaBell, FaHome, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const Sites = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const logos = [
    { src: '/img/1.png', name: '1XBET' },
    { src: '/img/2.png', name: '1WIN' },
    { src: '/img/3.png', name: 'BABU88' },
    { src: '/img/4.png', name: 'MELBET' },
    { src: '/img/7.png', name: 'LINEBET' },
    { src: '/img/8.png', name: 'CK444' },
    { src: '/img/12.png', name: 'TK9999' },
    { src: '/img/14.png', name: '777JAYA' },
  ];

  const handleImageClick = (index) => {
    navigate('/plane');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Logout error', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-200">

      {/* Header */}
      <header className="bg-[#b72d40] text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">AVIATOR PREDICTOR</h1>
        <div className="flex items-center space-x-4 text-2xl">
          <a
            href="https://t.me/JokerX_H3q"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400"
          >
            <FaTelegramPlane />
          </a>
          <FaBell className="cursor-pointer hover:text-yellow-300" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-2 py-4">
        <h2 className="text-sm font-bold text-center mb-3 text-gray-800">
          Click On Your Favorite Online Gaming Site
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform p-3 flex flex-col items-center"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={logo.src}
                alt={`logo-${index + 1}`}
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700 bg-gray-200 px-4 py-1 rounded">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#b72d40] py-4">
        <div className="flex justify-around items-center">
          <FaHome
            className="text-white text-3xl cursor-pointer hover:text-gray-300"

            title="Home"
          />

          {
            isAdmin && ( <button
              onClick={handleDashboard}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow transition duration-200"
            >
              Dashboard
              <FaUserShield />
            </button>)
          }
        </div>
      </footer>
    </div>
  );
};

export default Sites;
