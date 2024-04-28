import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import { PATH } from "../utils/Path";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <div className="bg-white">
        <img src={Logo} alt="logo" className="w-10" />
      </div>
      <div className="flex space-x-4 text-white items-center">
        <Link to="/about" className="text-black">
          Aboutus
        </Link>
        <Link to={PATH.LOGIN} className="text-black">
          Login
        </Link>
        <Link to={PATH.SIGNUP} className="text-black">
          <button className="bg-[#00215E] text-white p-2 rounded">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
