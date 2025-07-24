import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

function Home() {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateCode = () => {
    const characters = "ATKLHSDFLKUadenoqtwxz0123456789";
    let result = "";
    for (let i = 0; i < 9; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    setCode(generateCode());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    //
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/validate-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();

      if (data.success) {
        navigate("/sites"); // ✅ Redirect if userId is valid
      } else {
        setError(data.message); // ❌ Show error if invalid
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Validation error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 px-4 py-5 text-center">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Your unique device code copy and sent to The AGENT and Active
      </h1>

      <p className="text-lg font-medium text-gray-700 mb-8">
        Your Code is: <span className="text-blue-600 font-bold">{code}</span>
      </p>

      <div className="flex items-center gap-3 mb-6">
        <p className="text-gray-700 text-md">Contact With Admin: </p>
        <a href="https://t.me/JokerX_H3q" target="_blank" className="text-blue-500 text-xl">Telegram</a>
        <a href="https://t.me/JokerX_H3q" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl hover:text-blue-700">
          <FaTelegramPlane />
        </a>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input w-full input-bordered border-2 border-yellow-400 p-2 rounded-md focus:border-violet-500 focus:outline-none"
          required
          maxLength={9}
        />
        <button
          type="submit"
          className="btn w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-400 text-white font-bold py-2 rounded-md tracking-wider shadow-md hover:shadow-lg transition"
        >
          Submit
        </button>

        {error && <p className="text-red-500 text-lg">{error}</p>}
      </form>
    </div>
  );
}

export default Home;