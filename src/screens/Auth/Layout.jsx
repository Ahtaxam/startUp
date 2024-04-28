import React from "react";
import Logo from "../../assets/icons/logo.svg";

function AuthLayout({ children }) {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1  h-screen ">
      <div className="sm:flex justify-center items-center bg-[#00215E] hidden">
        <div className="w-[300px] h-[150px] bg-white shadow p-4 rounded-lg">
          <img src={Logo} alt="Logo" className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-center py-2 sm:py-0">
      <div className="max-w-[500px] w-full py-2">{children}</div>
        </div>
    </div>
  );
}

export default AuthLayout;
