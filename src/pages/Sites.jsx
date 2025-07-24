// src/pages/App.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaShoppingCart } from 'react-icons/fa';

const App = () => {
  const navigate = useNavigate();
  const images = Array.from({ length: 15 }, (_, i) => `/img/${i + 1}.png`);

  const handleImageClick = (index) => {
    // তুমি চাইলে index path এ পাঠাতে পারো, এখানে শুধু /plane এ নিচ্ছি
    navigate('/plane');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-300">
      {/* Header */}
      <header className="bg-red-600 text-white text-center py-4 text-xl font-bold">
        Aviator Predictor V19.2.5
      </header>

      {/* Image Grid */}
      <main className="py-8 px-4 flex-grow">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={src}
                alt={`img-${index + 1}`}
                className="w-full h-auto object-contain max-h-36"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-4 text-center space-y-3">
        <div className="flex justify-center items-center gap-2">
          <span>Contact Support on Telegram</span>
          <a
            href="https://t.me/JokerX_H3q"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-2xl hover:text-blue-600"
          >
            <FaTelegramPlane />
          </a>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span>Shop Now</span>
          <FaShoppingCart className="text-xl text-green-300 " />
        </div>
      </footer>
    </div>
  );
};

export default App;
