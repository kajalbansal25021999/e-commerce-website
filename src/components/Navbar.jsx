import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const buttonStyle = "mr-5 text-lg font-bold py-1 px-6";
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl text-white font-bold">Tech Coffee Break</div>
        {!isLoggedIn ? (
          <div className="flex">
            <Link to="/login">
              <button className={`${buttonStyle} bg-red-500 text-white`}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className={`${buttonStyle} bg-green-500 text-white`}>
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <Logout setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
