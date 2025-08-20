import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black sm:px-[8%] sm:py-[3%] p-2">
      {/* Animated background elements with warm colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main container with enhanced glassmorphism effect */}
      <div
        className={`backdrop-blur-xl bg-gray-900/30 border border-amber-400/20 rounded-3xl overflow-hidden h-full grid grid-cols-1 relative shadow-2xl shadow-black/40
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
            "linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(0, 0, 0, 0.7) 100%)",
          boxShadow:
            "0 12px 40px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(251, 191, 36, 0.2), 0 0 80px rgba(251, 191, 36, 0.08)",
        }}
      >
        {/* Enhanced inner glow with warm tones */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-amber-400/8 to-transparent pointer-events-none"></div>

        {/* Warm top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>

        {/* Left Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-r border-amber-400/15 bg-gradient-to-b from-gray-800/20 to-transparent relative`}
        >
          {/* Sidebar warm accent */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-amber-400/40 via-transparent to-orange-400/40"></div>
          <Sidebar />
        </div>

        {/* Chat Container - scroll handled internally */}
        <div className="h-full overflow-hidden relative bg-gradient-to-b from-gray-800/10 to-gray-900/20">
          {/* Chat container warm subtle accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/5 to-transparent pointer-events-none"></div>
          <ChatContainer />
        </div>

        {/* Right Sidebar - hidden on mobile when chat is open */}
        <div
          className={`${
            selectedUser ? "hidden sm:block" : "block"
          } h-full overflow-hidden border-l border-amber-400/15 bg-gradient-to-b from-gray-800/20 to-transparent relative`}
        >
          {/* Right sidebar warm accent */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-orange-400/40 via-transparent to-amber-400/40"></div>
          <RightSidebar />
        </div>

        {/* Warm bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
      </div>

      {/* Floating elements with warm colors for professional touch */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-30 hidden sm:block"></div>
      <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-30 hidden sm:block animation-delay-1000"></div>

      {/* Professional status indicator with warm accent */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-amber-100/80 text-xs font-medium">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
        <span>Connected</span>
      </div>
    </div>
  );
};

export default HomePage;
