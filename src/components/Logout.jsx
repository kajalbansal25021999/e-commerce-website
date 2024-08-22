import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <button
      className="mr-5 text-lg font-bold py-1 px-6 bg-red-500 text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
