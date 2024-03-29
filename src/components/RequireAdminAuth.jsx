import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAdminAuth = ({ children, redirectTo = "/access-denied" }) => {
    const { currentUser, initialLoading } = useAuthContext();
    if (initialLoading) return <></>;
    return currentUser && currentUser?.admin ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    );
};

export default RequireAdminAuth;
