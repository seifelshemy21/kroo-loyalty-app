import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function PersistLogin() {
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        // In a real application, you would use the token to fetch 
        // the user's profile from the backend to ensure the token is still valid.
        // For now, we'll just acknowledge the token presence.
        setLoading(false);
    }, [token]);

    return loading ? (
        <div className="flex justify-center items-center h-screen font-black text-2xl uppercase tracking-widest animate-pulse">
            Authenticating...
        </div>
    ) : (
        <Outlet />
    );
}
