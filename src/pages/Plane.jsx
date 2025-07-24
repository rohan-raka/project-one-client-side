import React, { useEffect, useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import '../glitch.css'; // Glitch effect CSS

const PlanePage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [crashValue, setCrashValue] = useState(1.0);

  // ✅ Date & Time Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
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

  // ✅ Connect to Aviator WebSocket
  useEffect(() => {
    const socket = new WebSocket(
      `wss://melbet-bangladesh.mobi/games-frame/sockets/crash?whence=114&fcountry=19&ref=8&gr=1185&appGuid=games-web-app-unknown&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC8xMzI2MTE2MzA3IiwicGlkIjoiOCIsImp0aSI6IjAvMGU1MTMwYzI0ZDZmZjgzOTMzYTI0YTM0ZjRiMWRjYjFhNTMxNjZiYjBlMDk5MmQ3Zjc0ODA4MTYwNGNjNzA5MyIsImFwcCI6Ik5BIiwiaW5uZXIiOiJ0cnVlIiwibmJmIjoxNzUzMTg4MDAyLCJleHAiOjE3NTMyMDI0MDIsImlhdCI6MTc1MzE4ODAwMn0.5JuvOxArFXiYe-HIcEmo8mCitniz47tthvetqkRbGVnTlftn-QUSYhhJ7TBoscHeF1392OAkSWglhWoFs1S5ag`
    );

    socket.onopen = () => {
      console.log('🟢 WebSocket connected');

      // Initial SignalR handshake
      socket.send(JSON.stringify({ protocol: 'json', version: 1 }) + '\x1e');

      // May not be necessary, depends on the server — kept from original
      socket.send(
        JSON.stringify({
          arguments: [{ activity: 30, account: 1284386225 }],
          invocationId: '0',
          target: 'Account',
          type: 1,
        }) + '\x1e'
      );
    };

    socket.onmessage = (event) => {
      const cleaned = event.data.replace(/\x1e$/, '');

      try {
        const parsed = JSON.parse(cleaned);

        // ✅ Check for crash update (target: 'OnCrash')
        if (
          parsed?.target === 'OnCrash' &&
          parsed.arguments &&
          parsed.arguments[0] &&
          parsed.arguments[0].f
        ) {
          const value = parseFloat(parsed.arguments[0].f);
          if (!isNaN(value)) {
            setCrashValue(value);
            console.log('💥 Live Crash Value:', value);
          }
        }
      } catch (err) {
        console.warn('⚠️ WebSocket message parse error:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    socket.onclose = () => {
      console.warn('🔴 WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className=" flex flex-col justify-between bg-gray-100">
      <header className="bg-red-600 text-white text-center py-4 text-xl font-bold">
        Aviator Predictor V19.2.5
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-2xl mt-4 font-bold text-red-600">Aviator Predictor V19.2.5</h1>

        <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-md font-semibold">
          {currentDate}
        </div>

        <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-lg font-semibold">
          {currentTime}
        </div>


<div className="relative w-60 h-60 mt-16 flex items-center justify-center">
  {/* Outer red circle */}
  <div className="absolute w-60 h-60 rounded-full border-2 border-red-500"></div>

  {/* Inner red circle */}
  <div className="absolute w-52 h-52 rounded-full border-4 border-red-600"></div>

  {/* Crash Value (centered) */}
  <div
    id="cash"
    className="absolute z-20 text-red-600 font-extrabold text-4xl"
  >
    {crashValue.toFixed(2)}x
  </div>

  {/* Rotating Plane Wrapper */}
  <div className="absolute w-full h-full animate-spin-slow">
    <div className="absolute left-5 top-0 transform -translate-x-1/2">
      <img
        src="/img/plane.jpg"
        alt="rotating-plane"
        className="w-38 h-38 object-contain drop-shadow-md" style={{ transform: 'rotate(-55deg)' }}
      />
    </div>
  </div>
</div>





        <button className="bg-red-600 text-xl text-white px-6 py-2 rounded-lg my-4 hover:bg-red-700 transition">
          Active
        </button>
      </main>

      <footer className="bg-red-600 text-white py-4 text-center ">
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
      </footer>
    </div>
  );
};

export default PlanePage;
