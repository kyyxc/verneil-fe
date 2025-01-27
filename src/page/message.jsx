import { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { usePostContext } from "../context/PostProvide";
import { Link, useParams } from "react-router-dom";
import { ax } from "../api/authentication";
import BubbleMessage from "../components/BubbleMessage";

export default function MessagePage() {
  const { setTabStatus } = usePostContext();
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [body, setBody] = useState("");

  useEffect(() => {
    getMessages();
  }, [username]);

  useEffect(() => {
    setTabStatus(true);
  }, []);
  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
      <div className="ml-[76px] relative w-96 bg-slate h-full">
        <div className="fixed top-0 h-20 px-4 w-96 flex items-center">
          <h1 className="text-xl text-1">AScdf</h1>
        </div>
        <div className="mt-20">
          <h1 className="font-semibold px-4">Message</h1>
          <div className="mt-4 hover:bg-white/10 py-0.5 px-4">
            <div className="flex items-center my-3">
              <img
                src="/images/iambluedee7.jpg"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div>
                <div className="ml-3 flex">
                  <h3 className="text-1 text-sm font-semibold">
                    <Link>dcrgr</Link>
                  </h3>
                </div>
                <h5 className="ml-3 text-xs text-1">dsds</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {username && (
        <div className="flex-1 bg-slate h-screen border-l border-l-btn relative">
          <div className="absolute top-0 border-b border-b-btn w-full h-20 px-5">
            <div className="flex items-center my-3">
              <img
                src="/images/iambluedee7.jpg"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div>
                <Link className="text-1 ml-4 text-sm font-semibold">Lucky</Link>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto mt-20 h-full max-h-[76%] p-4">
            {messages &&
              messages.map((message) => (
                <BubbleMessage
                  key={message.id}
                  message={message}
                  user={user}
                ></BubbleMessage>
              ))}
          </div>
          <div className="absolute bottom-4 w-full">
            <form
              onSubmit={handleMessage}
              className="w-full  flex justify-center"
            >
              <input
                type="text"
                className="w-full max-w-[96%] mx-auto px-4 py-2 border rounded-full bg-transparent"
                placeholder="Message..."
                name="message"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <button type="submit">
                <p className="text-blue-600">Send</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </BaseLayout>
  );
}
