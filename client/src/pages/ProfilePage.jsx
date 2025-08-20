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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-violet-300 rounded-full animate-ping opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-200 rounded-full animate-ping opacity-50 animation-delay-3000"></div>
      </div>

      {/* Professional profile container */}
      <div className="w-5/6 max-w-4xl relative">
        {/* Container glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 rounded-3xl blur opacity-30"></div>

        <div
          className="relative backdrop-blur-xl bg-slate-900/90 text-white border border-purple-200/40 flex items-center justify-between max-sm:flex-col-reverse rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.90) 100%)",
            boxShadow:
              "0 8px 32px 0 rgba(147, 51, 234, 0.20), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"></div>

          {/* Form section with enhanced styling */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-12 flex-1 relative"
          >
            {/* Professional header */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                Profile Settings
              </h3>
              <p className="text-slate-200 text-sm">
                Customize your profile information
              </p>
            </div>

            {/* Professional profile picture upload */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-slate-100 mb-3">
                Profile Picture
              </label>
              <label
                htmlFor="avatar"
                className="group flex items-center gap-4 cursor-pointer p-4 bg-slate-800/70 backdrop-blur-sm border border-purple-200/40 rounded-xl hover:bg-slate-800/90 transition-all duration-300 hover:border-purple-300/60"
              >
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  id="avatar"
                  accept=".png, .jpg, .jpeg .webp"
                  hidden
                />
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : authUser.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className={`relative w-16 h-16 object-cover border-2 border-purple-200/40 group-hover:border-purple-200/60 transition-all duration-300 ${
                      selectedImage ? "rounded-full" : "rounded-xl"
                    }`}
                  />
                  {/* Upload indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-purple-200 transition-colors duration-300">
                    Upload Profile Picture
                  </p>
                  <p className="text-slate-300 text-sm">
                    Click to change your profile image
                  </p>
                </div>
              </label>
            </div>

            {/* Professional input fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Display Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  required
                  placeholder="Your display name"
                  className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-purple-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300/60 transition-all duration-300 hover:bg-slate-800/90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Bio
                </label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-purple-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300/60 transition-all duration-300 hover:bg-slate-800/90 resize-none"
                  placeholder="Tell others about yourself..."
                  required
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Professional save button */}
            <button
              className="relative mt-4 py-4 px-8 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-purple-400 hover:via-violet-400 hover:to-pink-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/70 active:scale-[0.98]"
              type="submit"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 font-bold">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </span>
            </button>
          </form>

          {/* Enhanced logo section */}
          <div className="relative p-12 flex items-center justify-center">
            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-purple-400/8 to-transparent pointer-events-none"></div>
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-25 group-hover:opacity-35 transition duration-1000"></div>
              <div className="relative">
                <img
                  className={`w-48 h-48 object-cover relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-purple-200/30 hover:border-purple-200/50 filter brightness-110 ${
                    selectedImage ? "rounded-full" : "rounded-3xl"
                  }`}
                  src={assets.logo_icon}
                  alt=""
                />
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/70 to-transparent"></div>
        </div>

        {/* Professional status indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center space-x-2 text-slate-200 text-sm font-medium">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>Profile Editor</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
