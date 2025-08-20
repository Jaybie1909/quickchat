import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false); // ✅ new state for checkbox
  const [showError, setShowError] = useState(false);

  const { login } = useContext(AuthContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!agreed) {
      setShowError(true);
      return;
    }

    setShowError(false);
    // ✅ proceed with signup logic here
    console.log("Form submitted successfully!");

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-fuchsia-400 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-violet-300 rounded-full animate-ping opacity-50 animation-delay-3000"></div>
      </div>

      {/* Logo with enhanced styling */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full blur opacity-35 group-hover:opacity-45 transition duration-1000"></div>
        <img
          src={assets.logo_big}
          alt=""
          className="w-[min(30vw,250px)] relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 filter brightness-125"
        />
      </div>

      {/* Professional form container */}
      <div className="relative">
        {/* Form glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 rounded-2xl blur opacity-30"></div>

        <form
          onSubmit={onSubmitHandler}
          className="relative backdrop-blur-xl bg-slate-900/90 text-white border border-violet-200/40 p-8 flex flex-col gap-6 rounded-2xl shadow-2xl min-w-[400px] max-sm:min-w-[320px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.90) 50%, rgba(51, 65, 85, 0.85) 100%)",
            boxShadow:
              "0 8px 32px 0 rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent"></div>

          {/* Form header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-3xl bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">
              {currState}
            </h2>
            {isDataSubmitted && (
              <div className="p-2 hover:bg-violet-400/20 rounded-full transition-colors duration-200 cursor-pointer group">
                <img
                  onClick={() => {
                    setIsDataSubmitted(false);
                  }}
                  src={assets.arrow_icon}
                  alt=""
                  className="w-5 opacity-90 group-hover:opacity-100 transition-opacity duration-200 filter brightness-150"
                />
              </div>
            )}
          </div>

          {/* Input fields with professional styling */}
          {currState === "Sign Up" && !isDataSubmitted && (
            <div className="relative">
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-violet-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-300 hover:bg-slate-800/90"
                placeholder="Full Name"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300 focus-within:w-full"></div>
            </div>
          )}

          {!isDataSubmitted && (
            <>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-violet-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-300 hover:bg-slate-800/90"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-violet-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-300 hover:bg-slate-800/90"
                />
              </div>
            </>
          )}

          {currState === "Sign Up" && isDataSubmitted && (
            <div className="relative">
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full p-4 bg-slate-800/70 backdrop-blur-sm border border-violet-200/40 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-300 hover:bg-slate-800/90 resize-none"
              ></textarea>
            </div>
          )}

          {/* Professional button with gradient and hover effects */}
          <button
            type="submit"
            className="relative py-4 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-400/70 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative font-bold">
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </span>
          </button>

          {/* Checkbox with improved styling */}
          <div className="flex flex-col gap-1 text-sm text-slate-200">
            <label className="flex items-center gap-3 hover:text-white transition-colors duration-200">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setShowError(false);
                }}
                className="w-5 h-5 bg-slate-700 border-2 border-violet-300/60 rounded-md focus:ring-2 focus:ring-violet-400/70 accent-violet-500"
              />
              <span>I agree to the terms of use & privacy policy</span>
            </label>

            {showError && (
              <p className="text-red-500 text-sm">
                You must agree before continuing.
              </p>
            )}
          </div>

          {/* Enhanced toggle section */}
          <div className="pt-4 border-t border-violet-200/30">
            {currState === "Sign Up" ? (
              <p className="text-sm text-slate-300 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="font-semibold text-transparent bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text cursor-pointer hover:from-violet-200 hover:to-purple-200 transition-all duration-300"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-slate-300 text-center">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Sign Up");
                  }}
                  className="font-semibold text-transparent bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text cursor-pointer hover:from-violet-200 hover:to-purple-200 transition-all duration-300"
                >
                  Sign up here
                </span>
              </p>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
