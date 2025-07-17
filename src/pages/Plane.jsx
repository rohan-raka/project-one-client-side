import React, { useEffect, useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import '../glitch.css'; // Glitch effect CSS file import

const PlanePage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [crashValue, setCrashValue] = useState(1.00); // default value

  // Date & Time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  const socket = new WebSocket('wss://m1twjk-sdrldf.com/games-frame/sockets/crash');

  socket.onopen = () => {
    console.log('🟢 WebSocket connected');
    socket.send(JSON.stringify({ protocol: 'json', version: 1 }) + '\x1e');
  };

  socket.onmessage = (event) => {
    console.log('🛰️ Raw WS message:', event.data);

    let cleaned = event.data;
    if (cleaned.endsWith('\x1e')) {
      cleaned = cleaned.replace(/\x1e$/, '');
    }

    let data;
    try {
      data = JSON.parse(cleaned);
      console.log('📄 Parsed data:', data);
    } catch(err) {
      console.error('JSON parse error:', err, cleaned);
      return;
    }

    if (data.target === 'OnCrash' && data.arguments?.[0]?.f != null) {
      const value = parseFloat(data.arguments[0].f);
      console.log('🔢 Crash value received:', value);
      if (!isNaN(value)) {
        setCrashValue(value);
      }
    }
  };

  socket.onerror = (error) => console.error('❌ WS error:', error);
  socket.onclose = () => console.warn('🔴 WS closed');

  return () => socket.close();
}, []);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white text-center py-4 text-xl font-bold">
        Aviator Predictor V19.2.5
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-2xl -mt-10 md:mt-4 font-bold text-red-600">
          Aviator Predictor V19.2.5
        </h1>

        <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-md font-semibold">
          {currentDate}
        </div>

        <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-lg font-semibold">
          {currentTime}
        </div>

        {/* Double ring + rotating plane */}
        <div className="relative w-60 h-60 mt-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full border-2 border-red-500"></div>
          </div>

          <div className="absolute inset-4 flex items-center justify-center">
            <div className="w-52 h-52 rounded-full border-4 border-red-600"></div>
          </div>

          <div className="absolute inset-0 animate-spin-slow origin-center">
            <img
              src="/img/plane.jpg"
              alt="rotating-plane"
              className="absolute w-[200px] h-32 -top-6 left-1/2 transform -translate-x-5 -rotate-12"
              style={{ transformOrigin: 'center right' }}
            />
          </div>

          {/* Crash Value Display */}
          <div id="cash" className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-4xl">
            <span className="glitch" data-text={crashValue.toFixed(2)}>
              {crashValue.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="bg-red-600 text-xl text-white px-6 py-2 rounded-lg mt-1 hover:bg-red-700 transition">
          Active
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-4 text-center space-y-3">
        <div className="flex justify-center items-center gap-2">
          <span>Contact Support on Telegram</span>
          <a
            href="https://t.me/your_username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-2xl hover:text-blue-600"
          >
            <FaTelegramPlane />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PlanePage;
