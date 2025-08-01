import { useEffect, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostProvide";
import Create from "./create";
import SideBar from "./SideBar";
import SearchPanel from "./SearchPanel";
import { ax, Logout } from "../api/authentication";

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
    Logout(navigate);
  };

  const handleSeachTab = () => {
    setIsSearching(!isSearching);
    location.pathname == "/message" ||
    matchPath("/message/:username", location.pathname)
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
        isOpenMenuNav={isOpenMenu}
        setIsOpenMenuNav={setIsOpenMenu}
        handleLogout={handleLogout}
        handleSearchTab={handleSeachTab}
        tabStatus={tabStatus}
        setCreateStatus={setCreateStatus}
        createStatus={createStatus}
      ></SideBar>
      <SearchPanel isSearching={isSearching}></SearchPanel>

      {createStatus && <Create setCreateStatus={setCreateStatus}></Create>}
    </>
  );
}
