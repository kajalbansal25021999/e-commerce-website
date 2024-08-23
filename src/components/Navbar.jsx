import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = ({ isLoggedIn, setIsLoggedIn, cartCount }) => {
  const buttonStyle = "mr-5 text-lg font-bold py-1 px-6";
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl text-white font-bold">Shopping</div>
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
          <div className="flex items-center">
            <Link to="/cart" className="text-white text-2xl mr-6 relative">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
