import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Admin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center p-6">
          <div className="avatar mb-2">
            <div className="w-16 rounded-full ring ring-white ring-offset-2 mx-auto">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                alt="User Icon"
              />
            </div>
          </div>
          <h2 className="text-2xl text-black font-bold">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-center">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="input w-full input-bordered border-2 border-yellow-400 p-2 rounded-md focus:border-violet-500 focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="input w-full input-bordered border-2 border-yellow-400 p-2 pr-10 rounded-md focus:border-violet-500 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-400 text-white font-bold py-2 rounded-md tracking-wider shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
