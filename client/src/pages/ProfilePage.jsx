import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-30 animation-delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-30 animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-30 animation-delay-3000"></div>
      </div>

      {/* Professional profile container */}
      <div className="w-5/6 max-w-4xl relative">
        {/* Container glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-20"></div>
        
        <div 
          className="relative backdrop-blur-xl bg-white/10 text-white border border-white/20 flex items-center justify-between max-sm:flex-col-reverse rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          
          {/* Form section with enhanced styling */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-12 flex-1 relative"
          >
            {/* Professional header */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                Profile Settings
              </h3>
              <p className="text-white/60 text-sm">Customize your profile information</p>
            </div>

            {/* Professional profile picture upload */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-white/80 mb-3">Profile Picture</label>
              <label
                htmlFor="avatar"
                className="group flex items-center gap-4 cursor-pointer p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50"
              >
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  id="avatar"
                  accept=".png, .jpg, .jpeg .webp"
                  hidden
                />
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : authUser.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className={`relative w-16 h-16 object-cover border-2 border-white/30 group-hover:border-white/50 transition-all duration-300 ${selectedImage ? "rounded-full" : "rounded-xl"}`}
                  />
                  {/* Upload indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                    Upload Profile Picture
                  </p>
                  <p className="text-white/50 text-sm">Click to change your profile image</p>
                </div>
              </label>
            </div>

            {/* Professional input fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Display Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  required
                  placeholder="Your display name"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/10 resize-none"
                  placeholder="Tell others about yourself..."
                  required
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Professional save button */}
            <button
              className="relative mt-4 py-4 px-8 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-400/50 active:scale-[0.98]"
              type="submit"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </span>
            </button>
          </form>

          {/* Enhanced logo section */}
          <div className="relative p-12 flex items-center justify-center">
            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <img
                  className={`w-48 h-48 object-cover relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-white/20 hover:border-white/40 ${
                    selectedImage ? "rounded-full" : "rounded-3xl"
                  }`}
                  src={assets.logo_icon}
                  alt=""
                />
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        </div>

        {/* Professional status indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-white/60 text-sm font-medium">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Profile Editor</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;