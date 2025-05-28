import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full flex flex-col bg-gray-900/50">
      {/* Header - Fixed position */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500 bg-gray-900/80">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt=""
          className="hidden md:block max-w-5"
        />
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`flex items-end gap-2 ${
              msg.sender === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:max-w-[300px] text-sm font-light rounded-lg break-all ${
                  msg.sender === authUser._id
                    ? "bg-violet-600 rounded-br-none text-white"
                    : "bg-gray-700 rounded-bl-none text-white"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="flex flex-col items-center">
              <img
                src={
                  msg.sender === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-400 mt-1">
                  {formatMessageTime(msg.createdAt)}
                </p>
                {msg.sender === authUser._id && (
                  <span className="text-xs text-gray-400 mt-1">
                    {msg.seen ? "Seen" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box - Fixed position */}
      <div className="p-3 border-t border-gray-600 bg-gray-900/80">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-gray-700 px-3 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Send a message"
              className="flex-1 text-sm p-3 bg-transparent border-none rounded-lg outline-none text-white placeholder-gray-400"
            />
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
            />
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={assets.gallery_icon}
                alt="Send image"
                className="w-5 h-5"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-2 rounded-full ${
              input.trim() ? "bg-violet-600" : "bg-gray-600"
            }`}
          >
            <img src={assets.send_button} alt="Send" className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="hidden md:flex flex-col items-center justify-center gap-2 h-full bg-gray-900/50">
      <img src={assets.logo_icon} alt="" className="w-16 h-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
