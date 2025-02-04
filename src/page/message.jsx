import { useEffect, useState } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import { usePostContext } from "../context/PostProvide";
import { Link, useParams } from "react-router-dom";
import { ax } from "../api/authentication";
import BubbleMessage from "../components/BubbleMessage";
import ListMessages from "../components/ListMessages";
import { Image } from "lucide-react";

export default function MessagePage() {
  const { setTabStatus } = usePostContext();
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [listMessages, setlistMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [body, setBody] = useState("");
  const [images, setImages] = useState(null);
  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    getMessages();
    getListMessages();
    getDetailUser();
  }, [username]);

  useEffect(() => {
    setTabStatus(true);
  }, []);

  const handleChangeFile = (e) => {
    setImages(e.target.files[0]);
  };

  const getMessages = async () => {
    try {
      const res = await ax.get(`api/v1/users/${username}/message`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.message);
      setMessages(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   console.log(messages);
    
  // }, [messages])

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
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();

    const data = {
      body: body,
      attachment: images,
    };
    setBody("");

    try {
      const res = await ax.post(`api/v1/users/${username}/message`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, res.data];
        return newMessages;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseLayout>
      <div className="w-full h-screen overflow-hidden flex">
        <div className="sm:ml-[76px] w-24 lg:w-96 relative bg-slate h-full">
          <div className="fixed top-0 h-20 px-4 w-96 flex bg-black items-center">
            <h1 className="text-xl text-1">Kyyvrz</h1>
          </div>
          <div className="mt-20 h-full overflow-y-scroll">
            <h1 className="font-semibold px-4 hidden lg:block">Message</h1>
            {listMessages &&
              listMessages.map((message) => (
                <ListMessages key={message.id} message={message} user={user} />
              ))}
          </div>
        </div>
        {username && receiver && (
          <div className="flex-1 bg-slate h-full border-l border-l-btn">
            <div className="fixed w-full top-0 border-b border-b-btn  h-20 px-5">
              <div className="flex items-center my-3">
                <img
                  src={`http://127.0.0.1:8000/storage/${receiver.avatar}`}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <Link className="text-1 ml-4 text-sm font-semibold">
                    {username}
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto mt-20 h-full max-h-[72%] sm:max-h-[70%] lg:max-h-[76%] p-4">
              {messages &&
                messages.length > 0 &&
                messages.map((message, index) => (
                  <BubbleMessage
                    key={index}
                    message={message}
                    user={user}
                  ></BubbleMessage>
                ))}
            </div>
            <div className="flex justify-center">
              <div className="sm:absolute sm:bottom-4 w-full max-w-[800px] flex justify-center">
                <form
                  onSubmit={handleMessage}
                  className="w-full flex justify-center"
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    className="w-[80%] sm:w-[70%] md:w-[80%] lg:w-[70%] xl:w-[90%] px-4 py-2 border rounded-full bg-transparent"
                    placeholder="Message..."
                    name="message"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <div className="absolute flex right-12 items-center sm:right-28 md:right-24 lg:right-32 xl:right-12">
                    <input
                      type="file"
                      className="hidden"
                      id="file_message"
                      onChange={handleChangeFile}
                    />
                    <label htmlFor="file_message">
                      <Image />
                    </label>
                    <button type="submit" className="px-2 py-2 text-blue-600">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
