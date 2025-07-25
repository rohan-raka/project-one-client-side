import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState("loading"); // "loading", "authenticated", "unauthenticated"
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const verify = async () => {
      if (isAdmin) {
        // ✅ Admin always gets access
        setAuthState("authenticated");
        return;
      }

      if (!token) {
        setAuthState("unauthenticated");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/verifyToken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setAuthState("authenticated");
        } else {
          localStorage.removeItem("token");
          setAuthState("unauthenticated");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setAuthState("unauthenticated");
      }
    };

    verify();
  }, [token, isAdmin]);

  if (authState === "loading") {
    return <div className="text-center mt-10 text-gray-600">Authenticating...</div>;
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
