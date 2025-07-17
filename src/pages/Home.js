import React, { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";

function App() {
  const [code, setCode] = useState("");

  // Function to generate random 9-character alphanumeric code
  const generateCode = () => {
    const characters = "ATKLHSDFLKUadenoqtwxz0123456789";
    let result = "";
    for (let i = 0; i < 9; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Generate code on page load
  useEffect(() => {
    setCode(generateCode());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-3/6  bg-gray-100 px-4 py-5 text-center">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Your unique device code copy and sent to The AGENT and Active
      </h1>

      <p className="text-lg font-medium text-gray-700 mb-8">
        Your Code is: <span className="text-blue-600 font-bold">{code}</span>
      </p>

      <div className="flex items-center gap-3">
        <p className="text-gray-700 text-md">Contact With Admin: </p>

<a href="https://t.me/your_username" className="text-blue-500   text-xl" >Telegram</a>

        <a
          href="https://t.me/your_username" // change this to your Telegram link
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-2xl hover:text-blue-700"
        >
          <FaTelegramPlane />
        </a>


      </div>
    </div>
  );
}

export default App;
