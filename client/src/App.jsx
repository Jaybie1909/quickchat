import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import assets from "./assets/assets";

// Lazy load components for better performance
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-lg text-gray-600">Loading...</span>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { authUser } = useContext(AuthContext);

  if (requireAuth && !authUser) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  // Show loading state while authentication is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="min-h-screen bg-contain bg-no-repeat bg-center bg-gray-50"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      {/* Suspense wrapper for lazy-loaded components */}
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={true}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth={true}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all route for 404s */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
                  <p className="text-gray-600 mb-6">Page not found</p>
                  <Navigate to={authUser ? "/" : "/login"} replace />
                </div>
              </div>
            }
          />
        </Routes>
      </React.Suspense>
    </div>
  );
};

export default App;
