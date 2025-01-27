import React from "react";

const BubbleMessage = ({ message, user }) => {
  console.log();
  if (user.id == message.sender_id) {
    return (
      <div className="flex mt-6 justify-end">
        <div className="rounded-3xl px-4 py-1.5 ml-3 bg-blue-600">
          {message.body}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ipsam quae harum at cum, iusto doloribus eligendi tempora quo nisi.
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex mt-6">
        <img
          src={`http://localhost:8000/storage/${message.sender.avatar}`}
          className="w-[40px] h-[40px] rounded-full object-cover self-end"
        />
        <div className="rounded-3xl px-4 py-1.5 ml-3 bg-btn">
          {message.body}
        </div>
      </div>
    );
  }
};

export default BubbleMessage;
