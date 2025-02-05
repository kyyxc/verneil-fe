import { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { usePostContext } from "../context/PostProvide";
import { Link, useParams } from "react-router-dom";
import { ax } from "../api/authentication";
import BubbleMessage from "../components/BubbleMessage";
import ListMessages from "../components/ListMessages";
import { Image } from "lucide-react";
import { useLoadingContext } from "../context/LoadingContext";
import Loading from "../components/Loading";

export default function MessagePage({ children }) {
  const { setTabStatus } = usePostContext();
  const { username } = useParams();
  const [listMessages, setlistMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    getListMessages();
    getDetailUser();
  }, []);

  useEffect(() => {
    setTabStatus(true);
  }, []);

  const getDetailUser = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/detailMessage`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReceiver(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListMessages = async () => {
    setLoading((prev) => ({ ...prev, getList: true }));
    try {
      const res = await ax.get(`api/v1/users/message/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);

      setlistMessages(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, getList: false }));
    }
  };

  return (
    <BaseLayout>
      <div className="w-full h-screen overflow-hidden flex">
        <div className="sm:ml-[76px] w-24 lg:w-96 relative bg-slate h-full">
          <div className="fixed top-0 h-20 px-4 w-96 flex bg-black items-center">
            <h1 className="text-xl text-1">Kyyvrz</h1>
          </div>
          <div className="mt-20 h-full overflow-y-scroll scrollbar-hidden">
            <h1 className="font-semibold px-4 hidden lg:block">Message</h1>
            {listMessages &&
              listMessages.map((message, index) => (
                <ListMessages key={index} message={message} user={user} />
              ))}
            {loading.getList && (
              <div className="w-full flex justify-center items-center h-full">
                <Loading></Loading>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </BaseLayout>
  );
}
