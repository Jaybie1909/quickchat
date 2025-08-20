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

  const { login } = useContext(AuthContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col relative overflow-hidden">
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

      {/* Logo with enhanced styling */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
        <img 
          src={assets.logo_big} 
          alt="" 
          className="w-[min(30vw,250px)] relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 filter brightness-110" 
        />
      </div>

      {/* Professional form container */}
      <div className="relative">
        {/* Form glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-2xl blur opacity-25"></div>
        
        <form
          onSubmit={onSubmitHandler}
          className="relative backdrop-blur-xl bg-gray-900/85 text-white border border-amber-200/30 p-8 flex flex-col gap-6 rounded-2xl shadow-2xl min-w-[400px] max-sm:min-w-[320px]"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.85) 100%)',
            boxShadow: '0 8px 32px 0 rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
          
          {/* Form header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-3xl bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              {currState}
            </h2>
            {isDataSubmitted && (
              <div className="p-2 hover:bg-amber-400/20 rounded-full transition-colors duration-200 cursor-pointer group">
                <img
                  onClick={() => {
                    setIsDataSubmitted(false);
                  }}
                  src={assets.arrow_icon}
                  alt=""
                  className="w-5 opacity-80 group-hover:opacity-100 transition-opacity duration-200 filter brightness-125"
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
                className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80"
                placeholder="Full Name"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 focus-within:w-full"></div>
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
                  className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80"
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
                className="w-full p-4 bg-gray-800/60 backdrop-blur-sm border border-amber-200/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-300/50 transition-all duration-300 hover:bg-gray-800/80 resize-none"
              ></textarea>
            </div>
          )}

          {/* Professional button with gradient and hover effects */}
          <button
            type="submit"
            className="relative py-4 px-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-gray-900 font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-amber-400 hover:via-yellow-400 hover:to-orange-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400/60 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative font-bold">
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </span>
          </button>

          {/* Checkbox with improved styling */}
          <div className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition-colors duration-200">
            <div className="relative">
              <input 
                type="checkbox" 
                className="w-5 h-5 bg-gray-700 border-2 border-amber-300/50 rounded-md focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-0 focus:ring-offset-transparent accent-amber-500"
              />
            </div>
            <p>I agree to the terms of use & privacy policy</p>
          </div>

          {/* Enhanced toggle section */}
          <div className="pt-4 border-t border-amber-200/20">
            {currState === "Sign Up" ? (
              <p className="text-sm text-gray-300 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="font-semibold text-transparent bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text cursor-pointer hover:from-amber-200 hover:to-orange-200 transition-all duration-300"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-300 text-center">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Sign Up");
                  }}
                  className="font-semibold text-transparent bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text cursor-pointer hover:from-amber-200 hover:to-orange-200 transition-all duration-300"
                >
                  Sign up here
                </span>
              </p>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;