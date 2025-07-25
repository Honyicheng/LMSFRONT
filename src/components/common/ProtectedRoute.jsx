import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useSelector((state) => state.auth);
  if (!token || !user || !user.roles.includes("ROLE_" + role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
