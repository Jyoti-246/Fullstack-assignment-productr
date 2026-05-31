import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>
      <IoMdLogOut className="h-7 w-6 text-[#ffffff]" />
    </button>
  );
};

export default Logout;
