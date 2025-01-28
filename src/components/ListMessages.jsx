import React from "react";
import { Link } from "react-router-dom";

const ListMessages = ({ message, user }) => {
  return (
    <div className="mt-4 hover:bg-white/10 py-0.5 px-4">
      <div className="flex items-center my-3">
        <img
          src={`http://localhost:8000/storage/${
            user.id == message.sender_id
              ? message.receiver.avatar
              : message.sender.avatar
          }`}
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
        <div>
          <div className="ml-3 flex">
            <h3 className="text-1 text-sm font-semibold">
              <Link
                to={`/message/${
                  user.id == message.sender_id
                    ? message.receiver.username
                    : message.sender.username
                }`}
              >
                {user.id == message.sender_id
                  ? message.receiver.username
                  : message.sender.username}
              </Link>
            </h3>
          </div>
          <h5 className="ml-3 text-xs text-1">
            {message.body.substring(0, 10)}...
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ListMessages;
