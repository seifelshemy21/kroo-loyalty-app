import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login, isLoggingIn } = useAuth();

  async function submit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tighter">
          Welcome Back
        </h2>
        
        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full bg-primary text-black py-5 rounded-[2rem] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center border-4 border-white`}
          >
            {isLoggingIn ? 'Logging In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="font-black text-secondary hover:underline underline-offset-4 decoration-2">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}
