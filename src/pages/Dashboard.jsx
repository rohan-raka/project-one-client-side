import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  // Admin login protection — যদি লগইন না থাকে, redirect to /admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Fetch users from API
  const fetchUsers = () => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user handler
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const userId = form.userId.value;
    const user = { name: username, userId };

    fetch(`http://localhost:5000/addUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setShowModal(true);
          form.reset();
          fetchUsers();
        }
      });
  };

  // Delete user flow
  const handleDelete = (id) => {
    setDeleteUserId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/deleteUser/${deleteUserId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setShowDeleteConfirmModal(false);
          setShowSuccessModal(true);
          fetchUsers();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-xl shadow-lg">
        <button
          onClick={() => navigate("/sites")}
          className="flex items-center gap-2 text-lg font-bold text-purple-700 hover:text-purple-900 transition"
        >
          <FaGamepad className="text-xl" />
          All Games
        </button>
        <button
          onClick={handleAdminLogout}
          className="flex items-center gap-2 text-lg font-bold text-red-600 hover:text-red-800 transition"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>

      {/* ADD USER FORM */}
      <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center p-6">
          <div className="avatar mb-2">
            <div className="w-16 rounded-full ring ring-white ring-offset-2 mx-auto">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                alt="User Icon"
              />
            </div>
          </div>
          <h2 className="text-2xl text-black font-bold">Add User</h2>
        </div>

        <form onSubmit={handleAddUser} className="p-6 space-y-5 text-center">
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
            className="input w-full border-2 border-yellow-400 p-2 rounded-md focus:border-violet-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter User ID"
            name="userId"
            required
            maxLength={9}
            className="input w-full border-2 border-yellow-400 p-2 rounded-md focus:border-violet-500 focus:outline-none"
          />
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-400 text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* USER TABLE */}
      <div className="w-full max-w-5xl mt-12 mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          User Data
        </h2>
        <h2 className="text-xl text-white font-bold mb-4 text-center">
          Total User: <span className="text-black">({users.length})</span>
        </h2>
        <div className="overflow-x-auto rounded-sm shadow-md bg-white">
          <table className="table w-full border border-gray-200 text-center">
            <thead>
              <tr>
                <th className="bg-orange-500 text-white border py-3">No</th>
                <th className="bg-yellow-400 text-white border py-3">Name</th>
                <th className="bg-blue-400 text-white border py-3">User ID</th>
                <th className="bg-purple-500 text-white border py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-gray-100">
                    <td className="border py-2 font-medium">{index + 1}</td>
                    <td className="border py-2">{user.name}</td>
                    <td className="border py-2">{user.userId}</td>
                    <td className="border py-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white font-medium p-2 rounded-md shadow-md hover:shadow-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="modal-box relative py-10 bg-white text-center w-11/12 mx-auto shadow-xl rounded-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-sm font-bold text-gray-500 hover:text-red-500"
            >
              Close
            </button>
            <h3 className="font-bold text-lg text-green-600">
              User Added Successfully!
            </h3>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="modal-box relative bg-white text-center shadow-xl rounded-lg w-11/12 mx-auto p-6">
            <h3 className="text-lg font-bold text-red-600 mb-4">
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="btn p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="btn p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="modal-box relative bg-white text-center shadow-xl rounded-lg max-w-sm mx-auto py-10 px-6">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 text-sm font-bold text-gray-500 hover:text-red-500"
            >
              Close
            </button>
            <h3 className="font-bold text-lg text-green-600 mb-2">
              User Deleted Successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
