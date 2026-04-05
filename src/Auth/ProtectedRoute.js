import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Security Check</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to their respective correct dashboard if they try to cross-access
        return role === "admin" 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export const AdminRoute = () => <ProtectedRoute allowedRoles={["admin"]} />;
export const UserRoute = () => <ProtectedRoute allowedRoles={["customer"]} />;

export default ProtectedRoute;
