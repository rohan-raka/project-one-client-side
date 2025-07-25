import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    navigate("/"); // ⬅️ Redirect to Home
  };

  return (
     <div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-x-2 text-white px-4  rounded-md  transition duration-200"
      >
        Logout
        <FiLogOut className="text-lg" />
      </button>
    </div>
  );
};

export default LogoutButton;
