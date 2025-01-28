import { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { usePostContext } from "../context/PostProvide";
import { Link, useParams } from "react-router-dom";
import { ax } from "../api/authentication";
import BubbleMessage from "../components/BubbleMessage";
import ListMessages from "../components/ListMessages";

export default function MessagePage() {
  const { setTabStatus } = usePostContext();
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [listMessages, setlistMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [body, setBody] = useState("");

  useEffect(() => {
    getMessages();
    getListMessages();
  }, [username]);

  useEffect(() => {
    setTabStatus(true);
  }, []);

  const getMessages = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/message`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListMessages = async () => {
    try {
      const res = await ax.get(`api/v1/users/message/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setlistMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      return; // Cegah pengiriman pesan jika kosong
    }
    const data = {
      body: body,
    };
    setBody("");

    try {
      const res = await ax.post(`api/v1/users/${username}/message`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, res.data]; // Menambahkan pesan baru di atas
        return newMessages;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseLayout>
      <div className="w-full h-full overflow-hidden flex">
        <div className="ml-[76px] w-96 relative bg-slate h-full">
          <div className="fixed top-0 h-20 px-4 w-96 flex bg-black items-center">
            <h1 className="text-xl text-1">AScdf</h1>
          </div>
          <div className="mt-20 h-full overflow-y-scroll">
            <h1 className="font-semibold px-4">Message</h1>
            {listMessages &&
              listMessages.map((message) => (
                <ListMessages key={message.id} message={message} user={user} />
              ))}
          </div>
        </div>

        {username && (
          <div className="flex-1 bg-slate h-full border-l border-l-btn">
            <div className="fixed w-full top-0 border-b border-b-btn  h-20 px-5">
              <div className="flex items-center my-3">
                <img
                  src={`http://127.0.0.1:8000/storage/images/avatar.svg`}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <Link className="text-1 ml-4 text-sm font-semibold">
                    {username}
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto mt-20 h-full max-h-[76%] p-4">
              {messages && messages.length > 0 && 
                messages.map((message) => (
                  <BubbleMessage
                    key={message.id}
                    message={message}
                    user={user}
                  ></BubbleMessage>
                ))}
            </div>
            <div className="flex justify-center">
              <div class="absolute bottom-4 w-full max-w-[800px] flex justify-center">
                <form
                  onSubmit={handleMessage}
                  className="w-full flex justify-center"
                >
                  <input
                    type="text"
                    className="sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[90%] px-4 py-2 border rounded-full bg-transparent"
                    placeholder="Message..."
                    name="message"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
