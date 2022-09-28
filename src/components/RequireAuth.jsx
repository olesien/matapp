import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ children, redirectTo = "/access-denied" }) => {
    const { currentUser, initialLoading } = useAuthContext();
    if (initialLoading) return <></>;
    return currentUser ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
