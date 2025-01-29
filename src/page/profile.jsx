import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { useEffect, useState } from "react";
import UserProfileStat from "../components/UserProfileStat";
import UserPost from "../components/UserPost";
import UserProfileHeader from "../components/UserProfileHeader";
import { Link, useParams } from "react-router-dom";
import { userProfileProvider } from "../context/ProfileContext";

export default function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const {
    isOpenFollowers,
    setIsOpenFollowers,
    isOpenFollowing,
    setIsOpenFollowing,
  } = userProfileProvider();

  useEffect(() => {
    getUser();
    getFollowers();
    getfollowing();
  }, [username]);

  useEffect(() => {
    console.log(followers);
  }, []);

  const getFollowers = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.followers);

      setFollowers(res.data.followers);
    } catch (err) {
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
      setFollowing(res.data.following);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BaseLayout>
        {user && (
          <>
            <div
              className={`flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col ${
                isOpenFollowers || isOpenFollowing ? "opacity-30" : ""
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
                <UserProfileStat user={user}></UserProfileStat>
                <hr className="mt-2.5 lg:mt-10 border-t border-t-btn" />
                <div className="mt-10">
                  <UserPost posts={user.posts}></UserPost>
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
                              to="/"
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
                              to="/"
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
          </>
        )}
      </BaseLayout>
    </>
  );
}
