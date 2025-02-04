import React from "react";

const BubbleMessage = ({ message, user }) => {
  if (user.id == message.sender_id) {
    return (
      <div className="flex mt-2 justify-end">
        <div className="flex flex-col w-full justify-end max-w-[80%]">
          {message.attachment && (
            <img
              src={`http://127.0.0.1:8000/storage/${message.attachment.url_path}`}
              className="w-96 h-96 self-end rounded-xl object-cover"
              alt="Message Media"
            />
          )}
          <div className="rounded-3xl px-4 py-1.5 ml-3 bg-blue-600 mt-1.5 max-w-[80%] break-all self-end">
            {message.body}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex mt-2">
        <img
          src={`http://localhost:8000/storage/${message.sender.avatar}`}
          className="w-[40px] h-[40px] rounded-full object-cover self-end"
        />
        <div className="flex flex-col ml-3 max-w-[80%]">
          {message.attachment && (
            <img
              src={`http://127.0.0.1:8000/storage/${message.attachment.url_path}`}
              className="w-96 h-96 self-end rounded-xl object-cover"
              alt="Message Media"
            />
          )}
          <div className="rounded-3xl w-fit px-4 py-1.5 mt-1.5 bg-btn break-all">
            {message.body}
          </div>
        </div>
        {/* <div className="rounded-3xl px-4 py-1.5 ml-3 bg-btn max-w-[80%]">
          {message.body}
        </div> */}
      </div>
    );
  }
};

export default BubbleMessage;
