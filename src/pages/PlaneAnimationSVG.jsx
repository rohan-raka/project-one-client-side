import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaComments } from 'react-icons/fa';

const PlaneAnimationSVG = () => {
     const navigate = useNavigate();
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

   const openTelegram = () => {
    window.open('t.me/JokerX_H3q', '_blank');
  };


  return (
    <div className=" flex flex-col justify-between items-center bg-white">

      {/* Header */}
      <header className="bg-[#b72d40] w-full py-4 text-center text-white font-bold text-lg">
        Aviator Predictor
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow space-y-10">

        {/* Static Plane */}
        <img src="/img/plane.png" alt="Main Plane" className="w-52 h-auto mt-6" />

        {/* SVG Animation */}
        <div className="w-60 h-60 relative">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            {/* Outer Circle */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="red" strokeDasharray="5 5" />
            {/* Inner Circle */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="red" strokeDasharray="5 5" />

            {/* Outer Rotating Planes (Clockwise) */}
            <g>
              {[...Array(6)].map((_, i) => (
                <image
                  key={`outer-${i}`}
                  href="/img/small-plane.png"
                  width="25"
                  height="25"
                  x="94"
                  y="10"
                  transform={`rotate(${i * 60} 100 100)`}
                />
              ))}
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="18s"
                repeatCount="indefinite"
              />
            </g>

            {/* Inner Rotating Planes (Anti-clockwise) */}
            <g>
              {[...Array(6)].map((_, i) => (
                <image
                  key={`inner-${i}`}
                  href="/img/small-plane-2.png"
                  width="20"
                  height="20"
                  x="94"
                  y="50"
                  transform={`rotate(${i * 60} 100 100)`}
                />
              ))}
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 100 100"
                to="-360 100 100"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>

            {/* Center Text */}
            <text
              x="100"
              y="106"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="red"
            >
              2.22
            </text>
          </svg>
        </div>

        {/* Next Button */}
        <button className="bg-red-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-red-700  transition">
          Next
        </button>
      </main>

    <footer className="bg-gray-100 w-full py-3 flex justify-between items-center mt-28 px-6">
      {/* Home Navigate */}
      <FaHome
        className="text-red-600 text-2xl cursor-pointer"
        onClick={() => navigate('/sites')}
      />

      {/* Time */}
      <span className="text-sm font-medium text-gray-600">{time}</span>

      {/* Telegram Open */}

<a
            href="https://t.me/JokerX_H3q"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-red-600 text-2xl hover:text-blue-400"
          >
            <FaComments />
          </a>

    </footer>
    </div>
  );
};

export default PlaneAnimationSVG;
