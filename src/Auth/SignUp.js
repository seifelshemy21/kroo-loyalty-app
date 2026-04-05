import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  
  const { register, isRegistering } = useAuth();

  async function submit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    register({
      name,
      email,
      password,
      role: isBusiness ? 'business' : 'customer',
      businessName: isBusiness ? businessName : undefined
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tighter">
          Create Account
        </h2>
        
        <form onSubmit={submit} className="space-y-6">
          <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setIsBusiness(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all uppercase tracking-widest ${!isBusiness ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setIsBusiness(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all uppercase tracking-widest ${isBusiness ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
            >
              Business
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            {isBusiness && (
              <div>
                <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Business Name</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
                  placeholder="My Store"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center`}
          >
            {isRegistering ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="font-black text-black hover:underline underline-offset-4 decoration-2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
