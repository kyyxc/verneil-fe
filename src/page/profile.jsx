import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const res = await ax.get("api/v1/users/kyyvrz", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BaseLayout>
        <NavigationBar />
        {user && (
          <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
            <div className="fixed top-0 bg-black w-full sm:hidden text-center p-2 border-b font-semibold border-b-btn">
              {user.username}
            </div>

            <div className="mt-16 sm:mt-8 sm:px-4 lg:mx-6">
              <div className="">
                <div className="flex px-4 sm:px-0">
                  <div className="sm:flex-[1] sm:flex sm:justify-center sm:items-center">
                    <img
                      src={user.avatar}
                      alt="Profile Pic"
                      className="rounded-full object-cover sm:w-40 sm:h-40 w-20 h-20"
                    />
                  </div>
                  <div className="ml-5 sm:mt-4 sm:flex-[2] self-center">
                    <div className="sm:flex sm:items-center">
                      <div className="text-1 text-xl mb-2.5 sm:mb-0">
                        {user.username}
                      </div>
                      <div className="flex gap-5 sm:ml-8">
                        <input
                          type="button"
                          value="Follow"
                          className="bg-btn px-4 py-1 rounded-md"
                        />
                        <input
                          type="button"
                          value="Message"
                          className="bg-btn px-4 py-1 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="hidden sm:flex gap-x-16 mt-3.5">
                      <div className="sm:flex">
                        <p className="text-sm">
                          <b>{user.posts_count}</b> Post
                        </p>
                      </div>
                      <div className="sm:flex">
                        <p className="text-sm">
                          <b>{user.followers_count}</b> followers
                        </p>
                      </div>
                      <div className="sm:flex">
                        <p className="text-sm">
                          <b>{user.following_count}</b> following
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 hidden sm:flex sm:flex-col">
                      <h1 className="text-1 font-semibold">{user.full_name}</h1>
                      <p className="text-slate-300 md:w-[80%]">{user.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 sm:hidden px-4 sm:px-0 ">
                  <h1 className="text-1 font-semibold">{user.full_name}</h1>
                  <p className="text-slate-300">{user.bio}</p>
                </div>
                <div className="border-t border-t-btn py-1.5 flex justify-evenly items-center mt-5 sm:hidden">
                  <div className="text-center">
                    <p className="font-semibold text-sm">Post</p>
                    <p className="text-xs text-slate-300">{user.posts_count}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">Followers</p>
                    <p className="text-xs text-slate-300">
                      {user.followers_count}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">Following</p>
                    <p className="text-xs text-slate-300">
                      {user.following_count}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mt-2.5 lg:mt-10 border-t border-t-btn" />
              <div className="mt-10">
                <div className="grid grid-cols-3 gap-1 mb-20">
                  {user.posts &&
                    user.posts.map((post) => (
                      <div className="h-50" key={post.id}>
                        {post.media.map((url) => (
                          <img
                            key={url.id}
                            src={url.url_path}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </BaseLayout>
    </>
  );
}
