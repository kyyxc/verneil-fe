import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";
import Create from "./create";
import SideBar from "./SideBar";
import SearchPanel from "./SearchPanel";

export default function NavigationBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();

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
      <SideBar
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        handleLogout={handleLogout}
        handleSearchTab={handleSeachTab}
        tabStatus={tabStatus}
      ></SideBar>
      <SearchPanel isSearching={isSearching}></SearchPanel>

      {createStatus && <Create setCreateStatus={setCreateStatus}></Create>}
    </>
  );
}
