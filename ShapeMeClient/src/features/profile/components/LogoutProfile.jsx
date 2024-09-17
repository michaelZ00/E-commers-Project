import React, { useContext } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LogOutProfile() {
  const { logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/productsList");
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded-lg mt-6"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogOutProfile;
