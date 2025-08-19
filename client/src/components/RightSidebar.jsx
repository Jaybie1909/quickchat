import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl text-white w-full h-full flex flex-col relative ${
          selectedUser ? "max-md:hidden" : ""
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/5 pointer-events-none"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

        {/* Enhanced Profile Section */}
        <div className="relative pt-8 pb-6 flex flex-col items-center text-center">
          {/* Profile background glow */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          
          {/* Professional profile picture */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt=""
              className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
            {/* Online indicator */}
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white/50 shadow-lg animate-pulse"></div>
            )}
          </div>

          {/* User info with enhanced styling */}
          <div className="relative z-10 px-6 space-y-3">
            <h1 className="text-xl font-semibold text-white flex items-center justify-center gap-3">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {selectedUser.fullName}
              </span>
              {onlineUsers.includes(selectedUser._id) && (
                <div className="flex items-center gap-1 text-xs text-green-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Online
                </div>
              )}
            </h1>
            
            {selectedUser.bio && (
              <p className="text-white/70 text-sm leading-relaxed max-w-[200px] mx-auto">
                {selectedUser.bio}
              </p>
            )}
          </div>
        </div>

        {/* Professional divider */}
        <div className="relative mx-6 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm"></div>
        </div>

        {/* Enhanced Media Section */}
        <div className="flex-1 px-6 overflow-hidden flex flex-col">
          {/* Media header */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Shared Media
            </h3>
            <p className="text-xs text-white/50">
              {msgImages.length} {msgImages.length === 1 ? 'image' : 'images'} shared
            </p>
          </div>

          {/* Professional media grid */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {msgImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {msgImages.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => window.open(url)}
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
                  >
                    {/* Image with overlay */}
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={url} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* View icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <svg className="w-12 h-12 text-white/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/40 text-xs">No images shared yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Professional Logout Section */}
        <div className="relative mt-6 p-6 bg-gradient-to-t from-white/10 to-transparent border-t border-white/10">
          {/* Bottom accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          
          <button
            onClick={() => logout()}
            className="relative w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white border-none text-sm font-medium py-3 px-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group"
          >
            {/* Button glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Button highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
            
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-4 w-1 h-1 bg-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    )
  );
};

export default RightSidebar;