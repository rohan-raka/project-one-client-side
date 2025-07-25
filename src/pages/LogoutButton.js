import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Logout error", err);
  }

  localStorage.removeItem("token");
  navigate("/");
};

  return (
     <div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-gray-200  hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow transition duration-200"
      >
        Logout
     
      </button>
    </div>
  );
};

export default LogoutButton;
