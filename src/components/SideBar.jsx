import React from "react";
import SearchPanel from "./SearchPanel";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";
import { userProfileProvider } from "../context/ProfileContext";

const SideBar = ({
  isOpenMenuNav,
  tabStatus,
  handleSearchTab,
  setIsOpenMenuNav,
  handleLogout,
  setCreateStatus,
  createStatus,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isOpenLike, isOpenMenu, isDelete, isSearching } = usePostContext();
  const { isOpenFollowers, isOpenFollowing } = userProfileProvider();
  return (
    <div
      className={` ${
        tabStatus ? "w-[76px]" : "w-full sm:w-[76px] lg:w-[240px]"
      } ${
        isDelete ||
        isOpenLike ||
        isOpenMenu ||
        createStatus ||
        isOpenFollowers ||
        isOpenFollowing
          ? "opacity-20 pointer-events-none"
          : ""
      } h-[50px] bottom-0 sm:h-full fixed bg-black flex sm:flex-col sm:border-r transition-all  duration-500 sm:border-r-btn`}
    >
      {/* Header */}
      <div className="px-2 mt-2 py-4 text-white font-caveat h-24 hidden sm:block">
        <div
          className={`text-center text-5xl ${
            tabStatus ? "hidden" : "hidden lg:block "
          }`}
        >
          Verneil
        </div>
        <li
          className={`font-semibold items-center ${
            tabStatus ? "flex" : "flex lg:hidden"
          } sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg`}
        >
          <i className="bi bi-wechat text-[26px] lg:ml-1.5"></i>
        </li>
      </div>

      <div className="sm:text-slate-100 sm:mt-4 w-full">
        <ul className="sm:px-2.5 w-full flex flex-row justify-evenly items-center sm:items-start sm:flex-col">
          <NavLink
            to="/"
            icon="bi-house-door"
            tabStatus={tabStatus}
            label="Home"
          />
          <NavLink
            onClick={handleSearchTab}
            icon="bi-search"
            tabStatus={tabStatus}
            label="Search"
            className={tabStatus && isSearching ? 'border' : ''}
          />
          <NavLink
            to="/explore"
            icon="bi-compass"
            tabStatus={tabStatus}
            label="Explore"
          />
          <NavLink
            to="/message"
            icon="bi-chat"
            tabStatus={tabStatus}
            label="Message"
          />
          <NavLink
            onClick={() => setCreateStatus(true)}
            icon="bi-plus-circle"
            tabStatus={tabStatus}
            label="Create"
          />
          <Link
            to={`/${user.username}`}
            className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
          >
            <img
              src={`http://localhost:8000/storage/${user.avatar}`}
              alt="Profile"
              className="w-[26px] h-[26px] rounded-full lg:ml-1.5"
            />
            <h3
              className={`text-[16px] ml-4 ${
                tabStatus ? "hidden" : "hidden lg:block"
              }`}
            >
              {user.username}
            </h3>
          </Link>
        </ul>
      </div>

      {/* More Menu */}
      <div
        className="px-2.5 py-2 mt-auto hidden sm:block"
        onClick={() => setIsOpenMenuNav(!isOpenMenuNav)}
      >
        <div className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg">
          <i className="bi bi-list text-white text-[26px] lg:ml-1.5"></i>
          <h3
            className={`text-[16px] ml-4 ${
              tabStatus ? "hidden" : "hidden lg:block"
            }`}
          >
            More
          </h3>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={` ${isOpenMenuNav ? "sm:block" : "hidden"} w-[200px]
       rounded-xl p-2.5 bg-btn ml-4 bottom-[4.5rem] fixed z-50 mx-2`}
      >
        <div
          className="text-slate-100 text-sm px-4 py-2.5 hover:bg-white/10 rounded-md"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </div>

      <SearchPanel></SearchPanel>
    </div>
  );
};

export default SideBar;
