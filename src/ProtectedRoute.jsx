import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/auth";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const { setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    const checkToken = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
        setAuthenticated(true);
      } catch (error) {
        console.log("Token validation error:", error);

        localStorage.removeItem("token");
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkToken();
  }, [setUser]);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;