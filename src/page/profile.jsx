import { ax, Logout } from "../api/authentication";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userProfileProvider } from "../context/ProfileContext";
import BaseLayout from "../components/Layout/baseLayout";
import UserProfileStat from "../components/UserProfileStat";
import UserPost from "../components/UserPost";
import UserProfileHeader from "../components/UserProfileHeader";
import { usePostContext } from "../context/PostProvide";
import { useLoadingContext } from "../context/LoadingContext";
import Loading from "../components/Loading";

export default function ProfilePage() {
  const { username } = useParams();
  const { user, setUser } = usePostContext();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const {
    isOpenFollowers,
    setIsOpenFollowers,
    isOpenFollowing,
    setIsOpenFollowing,
    isOpenSettings,
    setIsOpenSettings,
  } = userProfileProvider();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    getUser();
  }, [username]);

  useEffect(() => {
    getFollowers();
    getfollowing();
  }, [user]);

  useEffect(() => {
    if (isNotFound) {
      document.title = "Page Not Found";
    } else {
      document.title = "Verneil";
    }
  }, [isNotFound]);

  const handleLogout = () => {
    Logout(navigate);
  };

  const getFollowers = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFollowers(res.data.followers);
    } catch (err) {
      setIsNotFound(true);
      console.log(err);
    }
  };

  const getfollowing = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/following`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFollowing(res.data.following.filter((user) => !user.is_requested));
    } catch (err) {
      setIsNotFound(true);
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      setLoading((prev) => ({ ...prev, getUser: true }));
      const res = await ax.get(`api/v1/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      setIsNotFound(true);
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, getUser: false }));
    }
  };

  return (
    <>
      <BaseLayout>
        {user.username && (
          <>
            <div
              className={`flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col ${
                loading.getUser ? "opacity-50" : "opacity-100"
              } ${
                isOpenFollowers || isOpenFollowing || isOpenSettings
                  ? "opacity-30 pointer-events-none"
                  : ""
              }`}
            >
              <div className="fixed top-0 bg-black w-full sm:hidden text-center p-2 border-b font-semibold border-b-btn">
                {user.username}
              </div>

              <div className="mt-16 sm:mt-8 sm:px-4 lg:mx-6">
                <UserProfileHeader
                  user={user}
                  setUser={setUser}
                  setIsOpenFollowers={setIsOpenFollowers}
                  setIsOpenFollowing={setIsOpenFollowing}
                ></UserProfileHeader>
                <UserProfileStat
                  user={user}
                  setIsOpenFollowers={setIsOpenFollowers}
                  setIsOpenFollowing={setIsOpenFollowing}
                ></UserProfileStat>
                <hr className="mt-2.5 lg:mt-10 border-t border-t-btn" />
                <div className="mt-10">
                  <UserPost user={user}></UserPost>
                </div>
              </div>
            </div>

            {isOpenFollowers && followers && (
              <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 h-96 bg-btn">
                <div className="h-full flex flex-col">
                  <div className="flex relative justify-center py-1.5  border-b border-b-slate-400">
                    <h1>Followers</h1>
                    <i
                      className="bi bi-x fixed right-2 text-1 top-0 text-[24px]"
                      onClick={() => setIsOpenFollowers(false)}
                    ></i>
                  </div>
                  <div className="p-4 overflow-y-scroll h-full">
                    {followers.map((user) => (
                      <div className="flex items-center my-4">
                        <img
                          src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <div className="">
                          <div className="ml-3 flex">
                            <Link
                              to={`/${user.username}`}
                              onClick={() => setIsOpenFollowers(false)}
                              className="text-1 text-sm font-semibold"
                            >
                              {user.username}
                            </Link>
                          </div>
                          <h5 className="ml-3 text-xs text-1">
                            {user.full_name}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isOpenFollowing && following && (
              <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 h-96 bg-btn">
                <div className="h-full flex flex-col">
                  <div className="flex relative justify-center py-1.5  border-b border-b-slate-400">
                    <h1>Following</h1>
                    <i
                      className="bi bi-x fixed right-2 text-1 top-0 text-[24px]"
                      onClick={() => setIsOpenFollowing(false)}
                    ></i>
                  </div>
                  <div className="p-4 overflow-y-scroll h-full">
                    {following.map((user) => (
                      <div className="flex items-center my-4">
                        <img
                          src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <div className="">
                          <div className="ml-3 flex">
                            <Link
                              onClick={() => setIsOpenFollowing(false)}
                              to={`/${user.username}`}
                              className="text-1 text-sm font-semibold"
                            >
                              {user.username}
                            </Link>
                          </div>
                          <h5 className="ml-3 text-xs text-1">
                            {user.full_name}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isOpenSettings && (
              <div className="fixed flex  flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-96 bg-btn text-sm">
                <Link
                  to="/saved"
                  onClick={() => setIsOpenSettings(false)}
                  className="w--full text-center py-3 border-b border-b-gray-500 cursor-pointer"
                >
                  Saved
                </Link>
                <div
                  className="w--full text-center py-3 border-b border-b-gray-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
                <div
                  className="w--full text-center py-3 cursor-pointer"
                  onClick={() => setIsOpenSettings(false)}
                >
                  Cancel
                </div>
              </div>
            )}
          </>
        )}
        {isNotFound && (
          <div
            className={`sm:ml-[76px] lg:ml-[240px] flex flex-col justify-center items-center h-screen w-full ${
              isOpenFollowers || isOpenFollowing || isOpenSettings
                ? "opacity-30 pointer-events-none"
                : ""
            }`}
          >
            <h1 className="text-3xl font-semibold my-4">
              Sorry, this page isn't available.
            </h1>
            <p className="text-base">
              The link you followed may be broken, or the page may have been
              removed. Go back to Verneil
            </p>
          </div>
        )}
        {loading.getUser && (
          <div className="left-1/2 z-50 top-1/2 transform translate-x-1/2 translate-y-1/2 absolute">
            <Loading></Loading>
          </div>
        )}
      </BaseLayout>
    </>
  );
}
