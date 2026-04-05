import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore session from localStorage on refresh
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setRole(savedRole);
        }
        setLoading(false);
    }, []);

    const login = (userData, userToken) => {
        const userRole = userData.role || "customer"; // Default to customer if not specified
        setUser(userData);
        setToken(userToken);
        setRole(userRole);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
        localStorage.setItem("role", userRole);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ user, token, role, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
