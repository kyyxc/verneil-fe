import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";

const NavLink = ({ to, onClick, label, tabStatus, icon, className }) => {
  const location = useLocation();
  const { isSearching } = usePostContext();
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${className} ${
        location.pathname == to ? "font-semibold" : ""
      } flex my-2 items-center sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg`}
    >
      <i
        className={`bi ${icon}${
          location.pathname == to && !isSearching ? "-fill" : ""
        } text-[26px] lg:ml-1.5`}
      ></i>
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
