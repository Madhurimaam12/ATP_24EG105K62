import { useAuth } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, currentUser, isAuthenticated } = useAuth();
  const hasShownToast = useRef(false);
  
  useEffect(() => {
    if (!hasShownToast.current) {
      if (!isAuthenticated) {
        toast.error("Redirecting to Login");
        hasShownToast.current = true;
      } else if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
        toast.error("You don't have permission to access this page");
        hasShownToast.current = true;
      }
    }
  }, [isAuthenticated, currentUser?.role, allowedRoles]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
  }

  return children;
}

export default ProtectedRoute;
