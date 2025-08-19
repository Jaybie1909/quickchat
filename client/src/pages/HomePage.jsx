import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 sm:px-[8%] sm:py-[3%] p-2">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main container with glassmorphism effect */}
      <div
        className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden h-full grid grid-cols-1 relative shadow-2xl shadow-black/20
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
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

        {/* Left Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-r border-white/10 bg-gradient-to-b from-white/5 to-transparent relative`}
        >
          {/* Sidebar accent */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-blue-400/30 via-transparent to-purple-400/30"></div>
          <Sidebar />
        </div>

        {/* Chat Container - scroll handled internally */}
        <div className="h-full overflow-hidden relative bg-gradient-to-b from-white/2 to-white/5">
          {/* Chat container subtle accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent pointer-events-none"></div>
          <ChatContainer />
        </div>

        {/* Right Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-l border-white/10 bg-gradient-to-b from-white/5 to-transparent relative`}
        >
          {/* Right sidebar accent */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-purple-400/30 via-transparent to-blue-400/30"></div>
          <RightSidebar />
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      </div>

      {/* Floating elements for professional touch */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20 hidden sm:block"></div>
      <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-20 hidden sm:block animation-delay-1000"></div>

      {/* Professional status indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-white/60 text-xs font-medium">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Connected</span>
      </div>
    </div>
  );
};

export default HomePage;
