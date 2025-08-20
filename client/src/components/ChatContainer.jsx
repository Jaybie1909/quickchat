import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { FaTrashAlt, FaEllipsisV } from "react-icons/fa";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
    deleteMessage,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const messagesContainerRef = useRef();
  const inputRef = useRef(null); // 👈 NEW ref for input

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuMsg, setMobileMenuMsg] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      // Show scroll button if scrolled down more than 100px
      setShowScrollButton(scrollTop > 100);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
    scrollToBottom();
    inputRef.current?.focus(); // 👈 Keep focus after sending
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

  const handleDeleteClick = (msg) => {
    setMessageToDelete(msg);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (messageToDelete) {
      await deleteMessage(messageToDelete._id);
      setShowDeleteModal(false);
      setMessageToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  let longPressTimer = null;
  const handleTouchStart = (msg) => {
    longPressTimer = setTimeout(() => {
      setMobileMenuMsg(msg);
      setShowMobileMenu(true);
    }, 500);
  };
  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  // 👇 Focus input whenever a user is selected
  useEffect(() => {
    if (selectedUser && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getMessages(selectedUser._id).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          scrollToBottom();
        }, 50);
      });
    }
  }, [selectedUser, getMessages, scrollToBottom]);

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-purple-900/50 relative">
        {/* Loading background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 via-transparent to-purple-400/5"></div>
        <div className="flex flex-col items-center space-y-4">
          {/* Professional loading spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-violet-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-slate-200 font-medium">Loading messages...</div>
          <div className="text-slate-400 text-sm">Please wait a moment</div>
        </div>
      </div>
    );
  }

  return selectedUser ? (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/30 to-purple-900/30 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/2 via-transparent to-purple-400/5 pointer-events-none"></div>

      {/* Professional Header */}
      <div className="relative flex items-center gap-4 py-4 px-6 border-b border-violet-200/15 backdrop-blur-sm bg-gradient-to-r from-slate-800/85 to-slate-700/70">
        {/* Header glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"></div>

        <div className="relative">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-11 h-11 rounded-full object-cover border-2 border-violet-200/30 shadow-lg"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-violet-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold text-white mb-1">
            {selectedUser.fullName}
          </p>
          <p className="text-xs text-slate-300">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 hover:bg-violet-400/15 rounded-full transition-colors duration-200"
        >
          <img
            src={assets.arrow_icon}
            alt=""
            className="w-5 h-5 opacity-90 filter brightness-125"
          />
        </button>

        <button className="hidden md:block p-2 hover:bg-violet-400/15 rounded-full transition-colors duration-200">
          <img
            src={assets.help_icon}
            alt=""
            className="w-5 h-5 opacity-90 filter brightness-125"
          />
        </button>
      </div>

      {/* Enhanced Messages Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse relative scrollbar-thin scrollbar-thumb-violet-400/25 scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139, 92, 246, 0.25) transparent",
        }}
      >
        {messages.map((msg, index) => {
          const isSender =
            msg.sender?._id?.toString() === authUser?._id?.toString() ||
            msg.sender?.toString() === authUser?._id?.toString();

          const isDeleted = msg.deleted;
          return (
            <div
              key={msg._id || index}
              className={`flex items-end gap-3 ${
                isSender ? "justify-end" : "justify-start"
              } group relative animate-in slide-in-from-bottom-2 duration-300`}
              onTouchStart={
                isSender && !isDeleted ? () => handleTouchStart(msg) : undefined
              }
              onTouchEnd={isSender && !isDeleted ? handleTouchEnd : undefined}
            >
              {/* Enhanced Message Bubbles */}
              {isDeleted ? (
                <div className="flex flex-col items-end w-full">
                  <div className="italic text-xs text-slate-400 bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-violet-200/15 select-none">
                    This message was deleted
                  </div>
                </div>
              ) : msg.image ? (
                <div className="flex flex-col items-end relative group">
                  <div className="relative overflow-hidden rounded-2xl border border-violet-200/25 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={msg.image}
                      alt=""
                      className="max-w-[280px] max-h-[300px] object-cover"
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {isSender && (
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">
                      {msg.seen ? "✓ Seen" : "✓ Sent"}
                    </span>
                  )}
                  {isSender && !isDeleted && (
                    <button
                      className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-white bg-black/30 hover:bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                      onClick={() =>
                        setShowDropdown(
                          msg._id === showDropdown ? null : msg._id
                        )
                      }
                    >
                      <FaEllipsisV size={10} />
                    </button>
                  )}
                  {showDropdown === msg._id && (
                    <div className="absolute top-10 right-0 w-24 bg-slate-800/95 backdrop-blur-sm border border-violet-200/25 rounded-xl shadow-xl z-10 overflow-hidden">
                      <button
                        className="block w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200"
                        onClick={() => handleDeleteClick(msg)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-end relative group">
                  <div
                    className={`relative p-3 max-w-[280px] md:max-w-[350px] text-sm font-normal rounded-2xl break-words backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isSender
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white border-violet-200/25 rounded-br-md"
                        : "bg-gradient-to-br from-slate-800/70 to-slate-700/70 text-white border-violet-200/25 rounded-bl-md"
                    }`}
                  >
                    {/* Message glow effect */}
                    {isSender && (
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    )}

                    <p className="relative z-10 leading-relaxed">{msg.text}</p>

                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
                  </div>

                  {isSender && (
                    <span className="text-[10px] text-slate-400 mt-1 font-medium flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {msg.seen ? "Seen" : "Sent"}
                    </span>
                  )}

                  {isSender && !isDeleted && (
                    <button
                      className="absolute top-1 right-1 p-1.5 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                      onClick={() =>
                        setShowDropdown(
                          msg._id === showDropdown ? null : msg._id
                        )
                      }
                    >
                      <FaEllipsisV size={10} />
                    </button>
                  )}

                  {showDropdown === msg._id && (
                    <div className="absolute top-8 right-0 w-24 bg-slate-800/95 backdrop-blur-sm border border-violet-200/25 rounded-xl shadow-xl z-10 overflow-hidden">
                      <button
                        className="block w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200"
                        onClick={() => handleDeleteClick(msg)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Profile & Time */}
              <div className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <img
                    src={
                      isSender
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border-2 border-violet-200/25 shadow-md"
                  />
                  {/* Online indicator for non-sender */}
                  {!isSender && onlineUsers.includes(selectedUser._id) && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-violet-400 rounded-full border border-slate-800"></div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd} />

        {/* Enhanced Scroll Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Professional Input Box */}
      <div className="relative p-4 border-t border-violet-200/15 backdrop-blur-sm bg-gradient-to-r from-slate-800/85 to-slate-700/70">
        {/* Input glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>

        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-slate-800/70 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200/25 hover:border-violet-200/35 transition-colors duration-300">
            <input
              ref={inputRef} // 👈 attach ref here
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-sm py-2 bg-transparent border-none outline-none text-white placeholder-slate-300 font-normal"
            />

            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
            />

            <label
              htmlFor="image"
              className="cursor-pointer p-2 hover:bg-violet-400/15 rounded-full transition-colors duration-200"
            >
              <img
                src={assets.gallery_icon}
                alt="Send image"
                className="w-5 h-5 opacity-90 hover:opacity-100 transition-opacity duration-200 filter brightness-125"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className={`relative p-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
              input.trim()
                ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                : "bg-slate-600/40 cursor-not-allowed"
            }`}
          >
            {input.trim() && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            )}
            <img
              src={assets.send_button}
              alt="Send"
              className="relative w-5 h-5 z-10 filter brightness-125"
            />
          </button>
        </form>
      </div>

      {/* Enhanced Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-violet-200/25 p-8 rounded-2xl shadow-2xl w-80 text-center">
            {/* Modal glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-violet-500/20 rounded-2xl blur opacity-50"></div>

            <div className="relative">
              <div className="mb-6">
                <div className="mx-auto mb-4 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <FaTrashAlt className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Delete Message
                </h3>
                <p className="text-slate-300 text-sm">
                  This action cannot be undone. The message will be permanently
                  deleted.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-slate-700/70 hover:bg-slate-600/80 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-violet-200/25"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Menu */}
      {showMobileMenu && mobileMenuMsg && (
        <div
          className="fixed inset-0 z-50 flex items-end md:hidden bg-black/70 backdrop-blur-sm"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="w-full bg-slate-800/95 backdrop-blur-xl border-t border-violet-200/25 rounded-t-2xl p-6 animate-in slide-in-from-bottom-full duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-violet-200/30 rounded-full mx-auto mb-6"></div>

            <button
              className="flex items-center gap-3 w-full text-left px-4 py-4 text-sm text-red-400 hover:bg-red-500/20 rounded-xl transition-colors duration-200"
              onClick={() => {
                handleDeleteClick(mobileMenuMsg);
                setShowMobileMenu(false);
              }}
            >
              <FaTrashAlt className="w-4 h-4" />
              Delete Message
            </button>

            <button
              className="flex items-center gap-3 w-full text-left px-4 py-4 text-sm text-slate-300 hover:bg-violet-400/15 rounded-xl transition-colors duration-200 mt-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden md:flex flex-col items-center justify-center gap-6 h-full bg-gradient-to-br from-slate-800/30 to-purple-900/30 relative">
      {/* Welcome screen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/2 via-transparent to-purple-400/5 pointer-events-none"></div>

      {/* Enhanced welcome screen */}
      <div className="relative text-center">
        <div className="absolute -inset-8 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-xl opacity-50"></div>
        <img
          src={assets.logo_icon}
          alt=""
          className="relative w-20 h-20 mx-auto mb-6 drop-shadow-2xl filter brightness-125"
        />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent mb-3">
          Welcome to Chat
        </h2>
        <p className="text-slate-300 max-w-sm leading-relaxed">
          Select a conversation from the sidebar to start chatting with your
          friends and colleagues.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-violet-400/50 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-ping animation-delay-1000"></div>
    </div>
  );
};

export default ChatContainer;
