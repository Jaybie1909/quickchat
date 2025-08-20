import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 sm:px-[8%] sm:py-[3%] p-2">
      {/* Animated background elements with warm purple colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main container with enhanced glassmorphism effect */}
      <div
        className={`backdrop-blur-xl bg-slate-900/35 border border-purple-300/30 rounded-3xl overflow-hidden h-full grid grid-cols-1 relative shadow-2xl shadow-black/50
          ${
            selectedUser
              ? "fixed inset-0 sm:static sm:rounded-3xl sm:h-full"
              : "h-full"
          }
          ${
            selectedUser
              ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
              : "md:grid-cols-2"
          }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.90) 0%, rgba(30, 27, 75, 0.85) 100%)",
          boxShadow:
            "0 12px 40px 0 rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(147, 51, 234, 0.25), 0 0 80px rgba(147, 51, 234, 0.12)",
        }}
      >
        {/* Enhanced inner glow with warm purple tones */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-400/10 to-transparent pointer-events-none"></div>

        {/* Warm purple top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"></div>

        {/* Left Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-r border-purple-300/20 bg-gradient-to-b from-slate-800/25 to-transparent relative`}
        >
          {/* Sidebar purple accent */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-purple-400/50 via-transparent to-violet-400/50"></div>
          <Sidebar />
        </div>

        {/* Chat Container - scroll handled internally */}
        <div className="h-full overflow-hidden relative bg-gradient-to-b from-slate-800/15 to-slate-900/25">
          {/* Chat container warm purple subtle accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-400/8 to-transparent pointer-events-none"></div>
          <ChatContainer />
        </div>

        {/* Right Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-l border-purple-300/20 bg-gradient-to-b from-slate-800/25 to-transparent relative`}
        >
          {/* Right sidebar purple accent */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-violet-400/50 via-transparent to-purple-400/50"></div>
          <RightSidebar />
        </div>

        {/* Warm purple bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/70 to-transparent"></div>
      </div>

      {/* Floating elements with warm purple colors for professional touch */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-40 hidden sm:block"></div>
      <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping opacity-40 hidden sm:block animation-delay-1000"></div>

      {/* Professional status indicator with warm purple accent */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-purple-100/90 text-xs font-medium">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60"></div>
        <span>Connected</span>
      </div>
    </div>
  );
};

export default HomePage;
