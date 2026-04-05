import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen font-black text-xl tracking-widest animate-pulse uppercase">Verifying...</div>;
    }

    return isAuthenticated ? ( 
        <Outlet /> 
    ) : (
        <Navigate state={{ from: location }} replace to="/login" />
    );
}
