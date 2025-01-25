import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { ax } from "../api/authentication";
import { useEffect, useState } from "react";
import UserProfileStat from "../components/UserProfileStat";
import UserPost from "../components/UserPost";
import UserProfileHeader from "../components/UserProfileHeader";

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
              <UserProfileHeader user={user}></UserProfileHeader>
              <UserProfileStat user={user}></UserProfileStat>
              <hr className="mt-2.5 lg:mt-10 border-t border-t-btn" />
              <div className="mt-10">
                  <UserPost posts={user.posts}></UserPost>
              </div>
            </div>
          </div>
        )}
      </BaseLayout>
    </>
  );
}
