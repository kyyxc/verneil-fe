import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";
import Create from "./create";

export default function NavigationBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    isSearching,
    setIsSearching,
    tabStatus,
    setTabStatus,
    createStatus,
    setCreateStatus,
  } = usePostContext();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSeachTab = () => {
    setIsSearching(!isSearching);
    location.pathname == "/message"
      ? setTabStatus(true)
      : setTabStatus(!tabStatus);
  };

  useEffect(() => {
    setTabStatus(false);
    setIsSearching(false);
  }, []);
  return (
    <>
      <div
        className={` ${
          tabStatus ? "w-[76px]" : "w-full sm:w-[76px] lg:w-[240px]"
        }  h-[50px] bottom-0 sm:h-full fixed bg-black flex sm:flex-col sm:border-r transition-all  duration-500 sm:border-r-btn`}
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
            <Link
              to="/"
              className="font-semibold flex items-center sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
            >
              <i className="bi bi-house-door-fill text-[26px] lg:ml-1.5"></i>
              <h3
                className={`text-[16px] ml-4 ${
                  tabStatus ? "hidden" : "hidden lg:block"
                }`}
              >
                Home
              </h3>
            </Link>
            <Link
              onClick={handleSeachTab}
              className={`${
                tabStatus ? "border" : ""
              } items-center hidden sm:flex sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg`}
            >
              <i className="bi bi-search text-[26px] lg:ml-1.5"></i>
              <h3
                className={`text-[16px] ml-4 ${
                  tabStatus ? "hidden" : "hidden lg:block"
                }`}
              >
                Search
              </h3>
            </Link>
            <Link
              to="/explore"
              className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
            >
              <i className="bi bi-compass text-[26px] lg:ml-1.5"></i>
              <h3
                className={`text-[16px] ml-4 ${
                  tabStatus ? "hidden" : "hidden lg:block"
                }`}
              >
                Explore
              </h3>
            </Link>
            <Link
              to="/message"
              className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
            >
              <i className="bi bi-chat text-[26px] lg:ml-1.5"></i>
              <h3
                className={`text-[16px] ml-4 ${
                  tabStatus ? "hidden" : "hidden lg:block"
                }`}
              >
                Messages
              </h3>
            </Link>
            <Link
              onClick={() => setCreateStatus(true)}
              className="flex items-center sm:mt-2.5 sm:justify-center lg:justify-normal sm:w-full hover:bg-white/10 px-2 py-1.5 rounded-lg"
            >
              <i className="bi bi-plus-circle text-[26px] lg:ml-1.5"></i>
              <h3
                className={`text-[16px] ml-4 ${
                  tabStatus ? "hidden" : "hidden lg:block"
                }`}
              >
                Create
              </h3>
            </Link>
            <Link
              to="/profile"
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
          onClick={() => setIsOpenMenu(!isOpenMenu)}
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
          className={` ${isOpenMenu ? "sm:block" : "hidden"} w-[200px]
           rounded-xl p-2.5 bg-btn ml-4 bottom-[4.5rem] fixed z-50 mx-2`}
        >
          <div
            className="text-slate-100 text-sm px-4 py-2.5 hover:bg-white/10 rounded-md"
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>

        <div
          className={`bg-black absolute top-0 w-96 h-screen p-6 ${
            isSearching ? "left-[76px]" : "left-[-500px]"
          } transition-all  duration-500`}
        >
          <div className="text-2xl font-semibold">Search</div>
          <form className="mt-12">
            <input
              type="text"
              className="w-full rounded-md py-2 px-2.5 outline-none bg-btn"
              placeholder="Search"
            />
            <hr className="border-t border-t-btn mt-10" />
          </form>
        </div>
      </div>

      {createStatus && <Create setCreateStatus={setCreateStatus}></Create>}
    </>
  );
}
