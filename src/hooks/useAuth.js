import { useContext } from "react";
import { AuthContext } from "../context/Context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, token, role, login, logout, loading } = context;

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            const { user, token } = data;

            // --- ADMIN OVERRIDE FOR TESTING ---
            if (user.email === "admin@kroo.com") {
                user.role = "admin";
            }
            // ----------------------------------

            login(user, token);
            toast.success(`Welcome back, ${user.name}!`);
            
            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Login failed");
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post("/auth/register", userData);
            return response.data;
        },
        onSuccess: (data) => {
            const { user, token } = data;

            // --- ADMIN OVERRIDE FOR TESTING ---
            if (user.email === "admin@kroo.com") {
                user.role = "admin";
            }
            // ----------------------------------

            login(user, token);
            toast.success("Account created successfully!");
            
            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Registration failed");
        },
    });

    const handleLogout = () => {
        logout();
        queryClient.clear(); // Reset all cached data for the next user
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return {
        user,
        token,
        role,
        isAdmin: role === "admin",
        isCustomer: role === "customer",
        isAuthenticated: !!token,
        loading,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        logout: handleLogout,
    };
}
;
