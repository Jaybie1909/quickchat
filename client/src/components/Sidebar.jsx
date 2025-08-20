import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages } =
    useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  // Sort users by lastMessageAt (descending)
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!a.lastMessageAt && !b.lastMessageAt) return 0;
    if (!a.lastMessageAt) return 1;
    if (!b.lastMessageAt) return -1;
    return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
  });

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-gradient-to-br from-purple-900/95 to-black/90 backdrop-blur-xl h-full flex flex-col relative overflow-hidden text-white ${
        selectedUser ? "max:md-hidden" : ""
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(30, 0, 40, 0.95) 50%, rgba(0, 0, 0, 0.9) 100%)",
        boxShadow: "inset 0 1px 0 rgba(196, 117, 225, 0.25)",
      }}
    >
      {/* Warm purple background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/8 via-pink-400/6 to-violet-500/10 pointer-events-none"></div>

      {/* Warm top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/70 to-transparent"></div>

      {/* Professional Header Section */}
      <div className="relative p-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          {/* Enhanced Logo with warm purple glow */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/30 to-pink-400/25 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={assets.logo}
              alt="logo"
              className="relative max-w-36 drop-shadow-lg hover:scale-105 transition-transform duration-300 brightness-110"
              style={{
                filter: "drop-shadow(0 0 8px rgba(196, 117, 225, 0.4))",
              }}
            />
          </div>

          {/* Professional Menu Dropdown with warm purple theme */}
          <div className="relative group">
            <button className="p-2 hover:bg-purple-400/15 rounded-full transition-all duration-300 hover:scale-110 border border-transparent hover:border-purple-400/30">
              <img
                src={assets.menu_icon}
                alt="Menu"
                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity duration-200 brightness-125"
              />
            </button>

            {/* Enhanced Dropdown with warm purple colors */}
            <div className="absolute top-full right-0 z-20 w-48 mt-2 bg-purple-900/95 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {/* Warm purple dropdown glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/30 to-pink-400/25 rounded-2xl blur opacity-60"></div>

              <div className="relative p-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-purple-400/15 hover:text-purple-100 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Edit Profile
                </button>

                <div className="my-1 mx-4 h-px bg-gradient-to-r from-transparent via-purple-300/35 to-transparent"></div>

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Search Bar with warm purple theme */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/35 to-pink-400/30 rounded-2xl blur opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-purple-800/40 backdrop-blur-sm rounded-2xl border border-purple-400/25 hover:border-purple-300/40 transition-colors duration-300 focus-within:border-purple-300/60">
            <div className="flex items-center gap-3 py-3 px-4">
              <svg
                className="w-4 h-4 text-purple-300/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="bg-transparent border-none outline-none text-white text-sm placeholder-purple-200 flex-1 font-normal focus:placeholder-purple-100"
                placeholder="Search conversations..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional User List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin scrollbar-thumb-purple-400/40 scrollbar-track-transparent">
        {/* Section Header */}
        <div className="px-3 mb-3">
          <h3 className="text-xs font-semibold text-purple-200/90 uppercase tracking-wider">
            Conversations ({sortedUsers.length})
          </h3>
        </div>

        <div className="space-y-1">
          {sortedUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
              }}
              className={`group relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-purple-400/10 ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-purple-400/25 to-pink-400/20 border border-purple-300/40 shadow-lg"
                  : "hover:scale-[1.02]"
              }`}
            >
              {/* Selection indicator with warm purple colors */}
              {selectedUser?._id === user._id && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-300 to-pink-300 rounded-r-full"></div>
              )}

              {/* Professional Profile Picture with warm purple glow */}
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute -inset-0.5 rounded-full transition-opacity duration-300 ${
                    selectedUser?._id === user._id
                      ? "bg-gradient-to-r from-purple-300 to-pink-300 blur opacity-50"
                      : "opacity-0 group-hover:opacity-30 bg-gradient-to-r from-purple-300/40 to-pink-300/20 blur"
                  }`}
                ></div>
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt=""
                  className="relative w-10 h-10 rounded-full object-cover border-2 border-purple-300/30 shadow-md"
                />
                {/* Enhanced Online Indicator */}
                {onlineUsers.includes(user._id) && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-900 shadow-lg animate-pulse"></div>
                )}
              </div>

              {/* User Info with Enhanced Typography */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p
                    className={`font-medium truncate transition-colors duration-200 ${
                      selectedUser?._id === user._id
                        ? "text-white"
                        : "text-purple-100 group-hover:text-white"
                    }`}
                  >
                    {user.fullName}
                  </p>

                  {/* Unseen Messages Badge with warm purple colors */}
                  {unseenMessages[user._id] > 0 && (
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full font-semibold shadow-lg">
                        {unseenMessages[user._id] > 99
                          ? "99+"
                          : unseenMessages[user._id]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Status */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      onlineUsers.includes(user._id)
                        ? "bg-green-400 animate-pulse"
                        : "bg-purple-400"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-medium transition-colors duration-200 ${
                      onlineUsers.includes(user._id)
                        ? "text-green-300"
                        : "text-purple-300"
                    }`}
                  >
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State with warm purple theme */}
        {sortedUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-12 h-12 text-purple-300/40 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-purple-200 text-sm">
              {input ? "No users found" : "No conversations yet"}
            </p>
          </div>
        )}
      </div>

      {/* Decorative elements with warm purple colors */}
      <div className="absolute top-24 left-4 w-1 h-1 bg-purple-300/50 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-4 w-1.5 h-1.5 bg-pink-300/50 rounded-full animate-ping animation-delay-2000"></div>
    </div>
  );
};

export default Sidebar;
