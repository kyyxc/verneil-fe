import { useEffect } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import NavigationBar from "../components/navigatioBar";
import { usePostContext } from "../context/PostProvide";

export default function MessagePage() {
  const { tabStatus, setTabStatus } = usePostContext();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setTabStatus(true);
  }, []);

  return (
    <BaseLayout>
      <NavigationBar></NavigationBar>
      <div className="ml-[76px] text-1 flex w-full">
        <div className="w-[450px] hidden sm:block px-4 py-10 bg-black h-screen border-r border-r-btn">
          <div className="flex text-xl font-semibold">
            <p>{user.username}</p>
          </div>
          <div className="mt-12 font-xl font-semibold">Message</div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <i className="bi bi-wechat text-9xl"></i>
            <p className="text-xl font-semibold">Start Message</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
