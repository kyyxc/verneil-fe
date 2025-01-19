import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <div className="w-full sm:w-[76px] lg:w-[240px] h-[50px] bottom-0 sm:h-full fixed bg-black flex sm:flex-col sm:border-r sm:border-r-btn">
      {/* Header */}
      <div className="px-2 mt-2 py-4 text-white font-caveat h-24 hidden sm:block">
        <div className="hidden lg:block text-center text-5xl">Verneil</div>
        <li className="font-semibold flex items-center lg:hidden sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
          <i className="bi bi-wechat text-[26px]"></i>
        </li>
      </div>

      {/* Item */}
      <div className="sm:text-slate-100 sm:mt-4 w-full">
        <ul className="sm:px-2.5 w-full flex flex-row justify-evenly items-center sm:items-start sm:flex-col">
          <Link to="/" className="font-semibold flex items-center sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-house-door-fill text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Home</h3>
          </Link>
          <Link className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-search text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Search</h3>
          </Link>
          <Link to='/explore' className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-compass text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Explore</h3>
          </Link>
          <Link className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-chat text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Messages</h3>
          </Link>
          <Link className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-plus-circle text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Create</h3>
          </Link>
          <Link to='/profile' className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
            <i className="bi bi-person-circle text-[26px]"></i>
            <h3 className="text-[16px] ml-4 hidden lg:block">Account</h3>
          </Link>
        </ul>
      </div>

      {/* More Menu */}
      <div
        className="px-2.5 py-2 mt-auto hidden sm:block"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
          <i className="bi bi-list text-white text-[26px]"></i>
          <h3 className="text-[16px] ml-4 hidden lg:block">More</h3>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={` ${isOpenMenu ? "sm:block" : "hidden"} w-[200px]
           rounded-xl p-5 bg-btn ml-4 bottom-[4.5rem] fixed z-50 mx-2`}
      >
        <div className="text-slate-100 text-sm">Log Out</div>
      </div>
    </div>
  );
}
