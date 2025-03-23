import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
const ProtectedComponents = ({ children, allowedRoles, profileStatus }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (profileStatus) {
    if (
      profileStatus.includes(user.profile_status) &&
      allowedRoles.includes(user.role)
    )
      return children;
    return null;
  }
  if (!allowedRoles.includes(user.role)) return null;
  return children;
};

export default ProtectedComponents;

ProtectedComponents.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.node.isRequired,
  profileStatus: PropTypes.node,
};
