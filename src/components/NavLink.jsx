import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, onClick, label, tabStatus, icon }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="font-semibold flex my-2 items-center sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
    >
      <i className={`bi ${icon} text-[26px] lg:ml-1.5`}></i>
      <h3
        className={`text-[16px] ml-4 ${
          tabStatus ? "hidden" : "hidden lg:block"
        }`}
      >
        {label}
      </h3>
    </Link>
  );
};

export default NavLink;
