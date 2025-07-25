import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaBell, FaHome } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

const App = () => {
  const navigate = useNavigate();

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
                     className=" text-2xl hover:text-blue-400"
                   >
                     <FaTelegramPlane />
                   </a>
          <FaBell className="cursor-pointer hover:text-yellow-300" />
        </div>
      </header>

      {/* Image Grid */}
      <main className="flex-grow px-2 py-4">

{/* heading */}
        <h2 className="text-sm font-bold text-center  mb-3 text-gray-800">Click On Your Favorite Online Gaming Site</h2>

        {/* Logo Grid */}

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
        <div className="flex justify-around">
          <FaHome className="text-white text-3xl cursor-pointer hover:text-gray-300" />
          <LogoutButton />
        </div>
   </footer>
    </div>
  );
};

export default App;
