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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-40 animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-amber-300 rounded-full animate-ping opacity-40 animation-delay-3000"></div>
      </div>

      {/* Professional profile container */}
      <div className="w-5/6 max-w-4xl relative">
        {/* Container glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl blur opacity-25"></div>
        
        <div 
          className="relative backdrop-blur-xl bg-gray-900/85 text-white border border-amber-200/30 flex items-center justify-between max-sm:flex-col-reverse rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.85) 100%)',
            boxShadow: '0 8px 32px 0 rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
          
          {/* Form section with enhanced styling */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-12 flex-1 relative"
          >
            {/* Professional header */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-2">
                Profile Settings
              </h3>
              <p className="text-gray-300 text-sm">Customize your profile information</p>
            </div>

            {/* Professional profile picture upload */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-200 mb-3">Profile Picture</label>
              <label
                htmlFor="avatar"
                className="group flex items-center gap-4 cursor-pointer p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl hover:bg-gray-800/80 transition-all duration-300 hover:border-amber-300/50"
              >
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  id="avatar"
                  accept=".png, .jpg, .jpeg .webp"
                  hidden
                />
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : authUser.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className={`relative w-16 h-16 object-cover border-2 border-amber-200/30 group-hover:border-amber-200/50 transition-all duration-300 ${selectedImage ? "rounded-full" : "rounded-xl"}`}
                  />
                  {/* Upload indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-amber-200 transition-colors duration-300">
                    Upload Profile Picture
                  </p>
                  <p className="text-gray-400 text-sm">Click to change your profile image</p>
                </div>
              </label>
            </div>

            {/* Professional input fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Display Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  required
                  placeholder="Your display name"
                  className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Bio</label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80 resize-none"
                  placeholder="Tell others about yourself..."
                  required
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Professional save button */}
            <button
              className="relative mt-4 py-4 px-8 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-gray-900 font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-amber-400 hover:via-yellow-400 hover:to-orange-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400/60 active:scale-[0.98]"
              type="submit"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 font-bold">
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
            <div className="absolute inset-0 bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none"></div>
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <img
                  className={`w-48 h-48 object-cover relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-amber-200/20 hover:border-amber-200/40 filter brightness-110 ${
                    selectedImage ? "rounded-full" : "rounded-3xl"
                  }`}
                  src={assets.logo_icon}
                  alt=""
                />
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
        </div>

        {/* Professional status indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-gray-300 text-sm font-medium">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span>Profile Editor</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;